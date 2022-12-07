"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var TransferSalesSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  date: {
    type: Date
    },
  fromsales: { type: Schema.Types.ObjectId, ref: "sales" },
  tosales: { type: Schema.Types.ObjectId, ref: "sales" },
  details: [
    {
      productid: { type: Schema.Types.ObjectId, ref: "products" },
      productname: {
        type: String
      },
      unit: {
        type: String
      },
      realquntity: {
        type: Number
      },
      quntity: {
        type: Number
      },
      unitname: {
        type: String
      }
    }
  ],
});
module.exports = mongoose.model("transfersales", TransferSalesSchema);
