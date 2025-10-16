sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("com.app.errorhandleuifa.controller.Home", {
        onInit: async function () {


        },
        onAfterRendering: async function () {

            var oChartModel = new JSONModel();
            this.getView().setModel(oChartModel, "oChartModel");

            // Fetch data from OData V4 service
            try {
                const oModel = this.getOwnerComponent().getModel();
                const oBinding = oModel.bindList("/DailyErrorCounts");
                await oBinding.requestContexts().then(aContexts => {
                    const aData = aContexts.map(oCtx => oCtx.getObject());
                    oChartModel.setData({ value: aData });
                });
            } catch (error) {
                console.error("Error fetching chart data:", error);
            }

            var oVizFrame = this.byId("idBarChart");
            var oPopover = this.byId("idPopOver");
            if (oPopover && oVizFrame) {
                oPopover.connect(oVizFrame.getVizUid());
            }

            // Cards
            var sCardManifestUrl = sap.ui.require.toUrl("com/app/errorhandleuifa/cardsManifests/cardsManifest.json");
            var cardManifests = new JSONModel();
            cardManifests.loadData(sCardManifestUrl);

            // var oHost = new sap.ui.integration.Host({
            //     resolveDestination: function (sDestinationName) {
            //         if (sDestinationName === "srv-api") {
            //             return sDestinationName;
            //         }
            //         return null;
            //     }
            // });

            // this.getView().byId("totalErrorsCard").setHost(oHost);
            // this.getView().byId("totalReprocessSuccessCard").setHost(oHost);
            // this.getView().byId("totalReprocessFailedCard").setHost(oHost);
            // this.getView().byId("totalNoRetriesYet").setHost(oHost);
            // this.getView().byId("IdDonutCard").setHost(oHost);
            // this.getView().byId("todayRecordsCard").setHost(oHost);


            this.getView().setModel(cardManifests, "manifests");
        }

    });
});