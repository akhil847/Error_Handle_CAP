// INPORTING FUNCTIONS FROM UTIL
const cds = require('@sap/cds');
const { onBeforeErrorLogSetCreate,
    onReTriggerIflow,   
    onBeforeErrorFilesSetCreate,
    onTriggerSFTP,
    onSendFileToCPI,
} = require("./controller/util.js");


module.exports = cds.service.impl(async function (srv) {
    const { ErrorLogSet } = srv.entities;
    srv.before(["CREATE"], "ErrorLogSet", onBeforeErrorLogSetCreate)   // BEFORE HANDLER FOR OPERATIONS BEFORE CREATION OF ErrorLogSet
    srv.before(["CREATE"], "ErrorFilesSet", onBeforeErrorFilesSetCreate) // BEFORE HANDLER FOR OPERATIONS BEFORE CREATION OF ErrorFilesSet
    srv.on(["reTrigger"], "ErrorLogSet", onReTriggerIflow) // ON HANDLER FOR TRIGGER IFLOW WITH PAYLOAD
    srv.on(["TriggerSFTP"], onTriggerSFTP) // ON HANDLER FOR TRIGGER IFLOW WITHOUT PAYLOAD (NOT USED IN APPLICATION)
    srv.on(["reTriggerFile"], onSendFileToCPI) // ON HANDLER FOR RE-TRIGGER FILE


    srv.on('countErrors', async (req) => {
        const total = await cds.run(SELECT.from(ErrorLogSet).columns([{ func: "count", as: "count" }]));
        const Success = await cds.run(SELECT.from(ErrorLogSet).columns([{ func: "count", as: "count" }]).where({ Status: 'Success' }));
        const Failed = await cds.run(SELECT.from(ErrorLogSet).columns([{ func: "count", as: "count" }]).where({ Status: 'Failed' }));
        const noRetries = await cds.run(SELECT.from(ErrorLogSet).columns([{ func: "count", as: "count" }]).where({ Status: 'No retries yet' }));

        return {
            TotalErrors: total[0].count,
            TotalSuccessErrors: Success[0].count,
            TotalFailedErrors: Failed[0].count,
            TotalNoretries: noRetries[0].count
        };
    });

    srv.on('countErrorsDonut', async (req) => {
        const total = await cds.run(SELECT.from(ErrorLogSet).columns([{ func: "count", as: "count" }]));
        const success = await cds.run(SELECT.from(ErrorLogSet).columns([{ func: "count", as: "count" }]).where({ Status: 'Success' }));
        const failed = await cds.run(SELECT.from(ErrorLogSet).columns([{ func: "count", as: "count" }]).where({ Status: 'Failed' }));
        const noRetries = await cds.run(SELECT.from(ErrorLogSet).columns([{ func: "count", as: "count" }]).where({ Status: 'No retries yet' }));

        return [
            { Identifier: 'TotalErrors', Value: total[0].count },
            { Identifier: 'TotalSuccessErrors', Value: success[0].count },
            { Identifier: 'TotalFailedErrors', Value: failed[0].count },
            { Identifier: 'TotalNoretries', Value: noRetries[0].count }
        ];
    });



});