const { executeHttpRequest } = require('@sap-cloud-sdk/http-client');
const { getDestination } = require('@sap-cloud-sdk/connectivity');
const { XMLBuilder } = require('fast-xml-parser');
const { Readable } = require('stream');

// const axios = require('axios');

const onBeforeErrorLogSetCreate = async (req) => {
    try {
        // req.data.IsActiveEntity = true;
        req.data.NumberOfRetriggers = 0;
        req.data.Status = "No retries yet";
        if (req.data.Source_payload) {
            if (typeof req.data.Source_payload !== 'string') {
                req.data.Source_payload = JSON.stringify(req.data.Source_payload);
            }
        }

    } catch (error) {
        // Reject with appropriate error code and message
        req.error(500, 'Error converting Source_payload to JSON: ' + error.message);
    }
}

const onBeforeErrorFilesSetCreate = async (req) => {
    try {
        let content = req.data.Content;

        // Case 1: Readable Stream
        if (content instanceof Readable) {
            console.log("Received stream instead of string");
            const chunks = [];
            for await (const chunk of content) {
                chunks.push(chunk);
            }

            const buffer = Buffer.concat(chunks);
            req.data.Content = buffer;
            return;
        }

        // Case 2: Base64 String
        if (typeof content === 'string') {
            // Remove data URI prefix if any
            const matches = content.match(/^data:.*;base64,(.*)$/);
            if (matches) {
                content = matches[1];
            }

            const buffer = Buffer.from(content, 'base64');
            req.data.Content = buffer;
            return;
        }

        req.error(400, 'Unsupported content type');
    } catch (err) {
        console.error("Error in handler:", err);
        req.error(400, 'Invalid base64 content' + err.message);
    }
};


const onReTriggerIflow = async (req) => {
    const endPoint = '/http/purchaseorder';
    const selectedId = req.params[0].ID;
    try {
        var result = await SELECT.one.from("ErrorLogSet").where({ ID: selectedId });
        if (result.Status === 'Success') {
            req.info(400, 'You can not retrigger success records');
            return
        }
        await UPDATE("ErrorLogSet").set({ NumberOfRetriggers: result.NumberOfRetriggers + 1, Status: "Failed" }).where({ ID: selectedId });
    } catch (error) {
        console.error(error.message)
        req.info(501, 'Count update failed')
    }

    try {
        const destination = await getDestination({
            destinationName: 'CPI_Destination'
        });
        if (destination) {
            destination.authTokens?.forEach(authToken => {
                if (authToken.error) {
                    throw new Error(`Error in authToken ${authToken.error}`);
                }
            });
        } else {
            throw new Error('Can not reach destination.');
        }
        // Last chnage
        // const builder = new XMLBuilder();
        // const xml = builder.build(jsonObj);
        // console.log("Generated XML" + xml)

        const response = await executeHttpRequest(destination, {
            method: 'POST',
            url: endPoint,
            data: result.Source_payload,
            headers: { 'Content-Type': 'application/json', 'Sender': 'CAP', 'Accept': 'application/json', 'TransactionType': 'Reprocess' }

        }
        );
        const updateStatus = await UPDATE("ErrorLogSet").set({ Status: "Success" }).where({ ID: selectedId });
        req.notify("Integration flow triggerd successfully See response")
        req.info(`Status:${JSON.stringify(response.status)} \n ResponseData:${JSON.stringify(response.data)}`)
        return { 'HTTP request': response, 'SideEffects': updateStatus };
    } catch (error) {
        console.error('HTTP Request Error:', error);
        // req.reject(`Cause:${JSON.stringify(error)}`);
        req.info(500, 'Reprocess failed :' + error.message);

    }
}
const onUpdateSourcePayload = async (req) => {
    try {

        var oResp = await SELECT.one.from("ErrorLogSet").where({ ID: req.data.ID });
        if (oResp.Status === 'Success') {
            req.info(400, 'Error in updating Source Payload : You can not update success records');
            return
        }
        const result = await UPDATE("ErrorLogSet").set({ Source_payload: req.data.Source_payload }).where({ ID: req.data.ID });
        // console.log("Updatedlog entry successfully");
        return result;
    } catch (error) {
        req.error(500, 'Error in updating: ' + error.message);
    }

}


module.exports = {
    onBeforeErrorLogSetCreate,
    onReTriggerIflow,
    onUpdateSourcePayload,
    onBeforeErrorFilesSetCreate
};
