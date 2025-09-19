sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("com.app.errorhandleuifa.controller.Home", {
        	onInit: function() {
                
            // var oView = this.getView();

            // // Load card manifests dynamically
            // var cardManifests = new JSONModel();
            // cardManifests.loadData(sap.ui.require.toUrl("com/app/errorhandleuifa/model/cardsManifests.json"));

            // // Set it as a named model
            // oView.setModel(cardManifests, "cardsManifest");

            // // Optionally set other data like date or icon
            // var homeIconUrl = sap.ui.require.toUrl("com/app/errorhandleuifa/images/CompanyLogo.png");
            // var oDateModel = new JSONModel({
            //     homeIconUrl: homeIconUrl,
            //     date: new Date().toLocaleDateString()
            // });
            // oView.setModel(oDateModel, "viewData");
        }
    });
});