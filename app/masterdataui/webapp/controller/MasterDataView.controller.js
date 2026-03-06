sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("masterdataui.controller.MasterDataView", {

        onInit: function () {
            this._drawerOpen = false;
            this._activeBtn = "btnTable1";
            this._activePanel = "tablePanel1";
            this._loadModel();
            this._startCarouselAutoScroll();
        },

        onExit: function () {
            clearInterval(this._carouselTimer);
        },

        _loadModel: function () {
            this.getView().setModel(new JSONModel({
                businessPartners: [
                    { id: "BP-001", name: "Acme Corporation", type: "Customer", country: "USA", status: "Active", statusState: "Success" },
                    { id: "BP-002", name: "Global Tech Ltd", type: "Vendor", country: "Germany", status: "Active", statusState: "Success" },
                    { id: "BP-003", name: "Pacific Imports Co", type: "Customer", country: "Japan", status: "Inactive", statusState: "Error" },
                    { id: "BP-004", name: "Meridian Supplies", type: "Partner", country: "UK", status: "Pending", statusState: "Warning" },
                    { id: "BP-005", name: "Nordic Solutions AS", type: "Vendor", country: "Norway", status: "Active", statusState: "Success" },
                    { id: "BP-006", name: "SunBridge Inc", type: "Customer", country: "Canada", status: "Active", statusState: "Success" }
                ]
            }));
        },

        _startCarouselAutoScroll: function () {
            var oCarousel = this.getView().byId("mainCarousel");
            this._carouselTimer = setInterval(function () {
                oCarousel.next();
            }, 4000);
        },

        onMenuToggle: function () {
            var oView = this.getView();
            var oDrawer = oView.byId("drawerPanel");
            var oOverlay = oView.byId("drawerOverlay");
            var oContent = oView.byId("mainContent");
            var oTableArea = oView.byId("tableArea");
            var bOpen = this._drawerOpen;

            oDrawer.toggleStyleClass("dmDrawerClosed", bOpen).toggleStyleClass("dmDrawerOpen", !bOpen);
            oOverlay.toggleStyleClass("dmHidden", bOpen).toggleStyleClass("dmOverlayVisible", !bOpen);
            oContent.toggleStyleClass("dmContentShifted", !bOpen).toggleStyleClass("dmContentFull", bOpen);
            oTableArea.toggleStyleClass("dmTableAreaHidden", bOpen);

            this._drawerOpen = !bOpen;
        },

        onOverlayPress: function () {
            if (this._drawerOpen) { this.onMenuToggle(); }
        },

        onTableNav: function (oEvent) {
            var oView = this.getView();
            var sBtnId = oEvent.getSource().getId().split("--").pop();
            var sPanel = "tablePanel" + sBtnId.replace("btnTable", "");

            oView.byId(this._activeBtn).removeStyleClass("dmNavBtnActive");
            oView.byId(sBtnId).addStyleClass("dmNavBtnActive");
            this._activeBtn = sBtnId;

            oView.byId(this._activePanel).addStyleClass("dmHidePanel");
            oView.byId(sPanel).removeStyleClass("dmHidePanel");
            this._activePanel = sPanel;
        }
    });
});