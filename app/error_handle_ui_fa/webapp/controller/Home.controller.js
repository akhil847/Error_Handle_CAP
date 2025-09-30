sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("com.app.errorhandleuifa.controller.Home", {
        onInit: async function () {
            var oChartModel = new JSONModel();
            this.getView().setModel(oChartModel, "oChartModel");

            // Fetch data from OData V4 service
            try {
                const oModel = this.getOwnerComponent().getModel();
                const oBinding = oModel.bindList("/DailyErrorCounts");
                await oBinding.requestContexts(0, 100).then(aContexts => {
                    const aData = aContexts.map(oCtx => oCtx.getObject());
                    oChartModel.setData({ value: aData });
                });
            } catch (error) {
                console.error("Error fetching chart data:", error);
            }

        },
        onAfterRendering: function () {
            var oVizFrame = this.byId("idBarChart");
            var oPopover = this.byId("idPopOver");
            if (oPopover && oVizFrame) {
                oPopover.connect(oVizFrame.getVizUid());
            }
        }

    });
});