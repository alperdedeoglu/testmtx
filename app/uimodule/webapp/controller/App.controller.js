sap.ui.define(
    ["sap/ui/core/mvc/Controller"],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} BaseController
     */
    function (BaseController) {
        "use strict";

        return BaseController.extend("com.myorg.bookstore.controller.App", {
            onInit() {},
            onAfterRendering: function(oEvent){
                let oDataModel = this.getView().getModel();
                oModel.read("/Books", {success: this.onDataRead, error: onError});
            },
            onDataRead:function(data){
              console.log(JSON.stringify(data))
            },
            onError: function(error){
              console.log(error)
            }  

        });
    }
);
