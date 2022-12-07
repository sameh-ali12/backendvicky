"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var CarDownloadSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  daterecived: {
    type: Date
    },
  sales: { type: Schema.Types.ObjectId, ref: "sales" },
  details: [
    {
      productid: { type: Schema.Types.ObjectId, ref: "products" },
      productname: {
        type: String,
      },
      unit: {
        type: String,
      },
      realquntity: {
        type: Number,
      },
      quntity: {
        type: Number,
      },
      unitname: {
        type: String,
      },
      balancestorebefore:{
        type:Number
      },
      balancestoreafter:{
        type:Number
      },
      store: { type: Schema.Types.ObjectId, ref: "stores" },
    },
  ],
});
module.exports = mongoose.model("cardownloads", CarDownloadSchema);
