sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("sap.ui.demo.MockServer.controller.App", {
		checkBeforeRead(oEvent) {
			const oSource = oEvent.getSource()
			const sheetData = oEvent.getParameter("sheetData")
			const errors = []

			for (const [index, row] of sheetData.entries()) {
				// Check for invalid currencies
				for (const key in row) {
					if (key.endsWith("[CurrencyCode]") && row[key].rawValue.length !== 3) {
						const error = {
							title: "Invalid currency",
							row: index + 2,
							group: true,
							rawValue: row[key].rawValue,
							ui5type: "Error"
						}

						errors.push(error)
					}
				}
			}

			oSource.addArrayToMessages(errors)
		},

		changeBeforeCreate(oEvent) {
			const payload = oEvent.getParameter("payload")
			
			if (payload.Price) {
				payload.Price = Number(payload.Price).toFixed(2)
			}

			return payload
		},

		uploadButtonPress(oEvent) {
			console.log(oEvent.getParameters())
		}
	});
});