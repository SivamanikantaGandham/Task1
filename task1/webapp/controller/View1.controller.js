sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/Input",
    "sap/m/DatePicker",
    "sap/m/Select",
    "sap/ui/core/Item",
    "sap/ui/model/Sorter"
], function (Controller, JSONModel, Dialog, Button, Input, DatePicker, Select, Item,Sorter) {
    "use strict";

    return Controller.extend("com.emo.pip.task1.controller.View1", {
        onInit: function () {
            var oModel = new JSONModel();
            oModel.loadData("model/myData.json", {}, false);
            this.getView().setModel(oModel);
        },
        formatTaskTypeClass: function(sType) {
            switch (sType) {
                case "Simple":
                    return "Success";
                    break;
                case "Complex":
                        return "Error";
                        break;    
                case "Medium":
                            return "Warning";
                            break;
                default:
                    break;
            }
            
        },
        formatTaskStatus: function(sStatus) {
            switch(sStatus) {
                case "Not Started":
                    return "Task Not Started";
                case "In Progress":
                    return "Task in Progress";
                case "Completed":
                    return "Task Completed";
                case "Reviewed":
                    return "Task Reviewed";
                default:
                    return "";
            }
        },

        onTaskButtonPress: function(oEvent) {
            var oTask = oEvent.getSource().getBindingContext().getObject();

            // Create dialog
            var oDialog = new Dialog({
                title: "Update Task",
                content: [
                    new Input({ value: oTask.description, placeholder: "Enter comments" }),
                    new DatePicker({ value: oTask.startDate, placeholder: "Start Date" }),
                    new DatePicker({ value: oTask.updatedDate, placeholder: "Updated Date" }),
                    new Select({
                        items: [
                            new Item({ key: "Not Started", text: "Not Started" }),
                            new Item({ key: "In Progress", text: "In Progress" }),
                            new Item({ key: "Completed", text: "Completed" })
                        ],
                        selectedKey: oTask.status
                    })
                ],
                beginButton: new Button({
                    text: "OK",
                    press: function() {
                        var aInputs = oDialog.getContent();
                        var sComments = aInputs[0].getValue();
                        var sStartDate = aInputs[1].getValue();
                        var sUpdatedDate = aInputs[2].getValue();
                        var sStatus = aInputs[3].getSelectedItem().getKey();

                        // Update task information in the table
                        oTask.description = sComments;
                        oTask.startDate = sStartDate;
                        oTask.updatedDate = sUpdatedDate;
                        oTask.status = sStatus;

                        // Update the model to reflect changes
                        var oModel = this.getView().getModel();
                        oModel.refresh(true);

                        oDialog.close();
                    }.bind(this)
                }),
                endButton: new Button({
                    text: "Cancel",
                    press: function() {
                        oDialog.close();
                    }
                })
            });

            // Open the dialog
            oDialog.open();
        }
    });
});
