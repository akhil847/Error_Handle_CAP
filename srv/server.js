const cds = require('@sap/cds');
const express = require('express');

cds.on('bootstrap', app => {
  // Increase payload size limits
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  app.use((req, res, next) => {
    if ((req.method === 'POST' || req.method === 'PUT') && req.body) {
      const body = req.body;

      // Handle Source_payload (ErrorLogSet)
      if (body.Source_payload && typeof body.Source_payload != 'string') {
        try {
          body.Source_payload = JSON.stringify(body.Source_payload);
        } catch (e) {
          console.error('Failed to stringify Source_payload', e);
          return res.status(400).send({
            error: {
              message: 'Invalid Source_payload format',
              target: 'Source_payload',
              code: '400'
            }
          });
        }
      }

      //  Handle Content (ErrorFilesSet)
      if (body.Content && typeof body.Content === 'string') {
        try {
          // Remove line breaks, decode base64
          const cleaned = body.Content.replace(/\r?\n|\r/g, '');
          // body.Content = Buffer.from(cleaned, 'base64');
        } catch (e) {
          return res.status(400).send({ error: { message: 'Invalid base64 Content '+ e.message, code: '400' } });
        }
      }
    }

    next();
  });
});

module.exports = cds.server;
