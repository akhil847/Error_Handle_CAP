sap.ui.define([
    "sap/m/MessageToast"
], function (MessageToast) {
    'use strict';

    return {
        onUploadfile: function (oEvent) {

            const oFileInput = document.createElement("input");
            oFileInput.type = "file";

            oFileInput.onchange = () => {
                const file = oFileInput.files[0];
                if (!file) {
                    return;
                }

                new sap.m.MessageBox.warning(`Do you want to upload file "${file.name}"? uploading new file will override the existing file`, {
                    actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
                    onClose: (oAction) => {
                        if (oAction === sap.m.MessageBox.Action.YES) {
                            console.log(`Uploading file: ${file.name}, MIME type: ${file.type}`);

                            const reader = new FileReader();
                            reader.onload = async (e) => {
                                const arrayBuffer = e.target.result;

                                const oContext = this.getBindingContext();
                                const sPath = oContext.getPath();
                                const sServiceUrl = this.getModel().sServiceUrl;
                                const sUploadUrl = `${sServiceUrl}${sPath}/Content/$value`;
                                oContext.setProperty("FileName", file.name)
                                oContext.setProperty("MIMEType", file.type)

                               await fetch(sUploadUrl, {
                                    method: "PUT",
                                    headers: {
                                        "Content-Type": file.type
                                    },
                                    body: arrayBuffer
                                }).then(() => {
                                    MessageToast.show("File uploaded successfully!");
                                    try {
                                        oContext.refresh();
                                    } catch (error) {
                                        MessageToast.show("Failed to refresh!");
                                    }
                                }).catch((error) => {
                                    MessageToast.show("File upload failed.");
                                    console.error("Upload error:", error);
                                });
                            };
                            reader.readAsArrayBuffer(file);
                        }
                    }
                });
            };

            // Trigger native file picker dialog
            oFileInput.click();
        }
    };
});
