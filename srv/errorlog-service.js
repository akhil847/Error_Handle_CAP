const cds = require('@sap/cds');
const { onBeforeErrorLogSetCreate,
    onReTriggerIflow,
    onBeforeErrorFilesSetCreate,
    onUpdateSourcePayload } = require("./controller/util.js");


module.exports = cds.service.impl(async function (srv) {
    const { ErrorLogSet } = srv.entities;

    srv.before(["CREATE"], "ErrorLogSet", onBeforeErrorLogSetCreate)
    srv.before(["CREATE"], "ErrorFilesSet", onBeforeErrorFilesSetCreate)
    // srv.on(["UPDATE"], "ErrorLogSet", onErrorLogSetUpdate)
    srv.on(["reTrigger"], "ErrorLogSet", onReTriggerIflow)
    // srv.on(["sourcePayloadUpdate"], "ErrorLogSet", onUpdateSourcePayload)

  srv.on('countErrors', async (req) => {
        const total = await cds.run(SELECT.from(ErrorLogSet).columns([{ func: "count", as: "count" }]));
        const Success = await cds.run(SELECT.from(ErrorLogSet).columns([{ func: "count", as: "count" }]).where({ Status: 'Success' }));
        const Failed = await cds.run(SELECT.from(ErrorLogSet).columns([{ func: "count", as: "count" }]).where({ Status: 'Failed' }));
        const noRetries = await cds.run(SELECT.from(ErrorLogSet).columns([{ func: "count", as: "count" }]).where({ Status: 'No retries yet' }));

        return {
            TotalErrors: total[0].count,
            TotalSuccessErrors: Success[0].count,
            TotalFailedErrors: Failed[0].count,
            TotalNoretries:noRetries[0].count
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