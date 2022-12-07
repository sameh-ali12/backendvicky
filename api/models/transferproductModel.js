"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var TransferProductSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  daterecived: {
    type: Date
  },
  tostore: { type: Schema.Types.ObjectId, ref: "stores" },
  details: [
    {
      productid: { type: Schema.Types.ObjectId, ref: "products" },
      unit: {
        type: String,
      },
      unitname: {
        type: String,
      },
      quntity: {
        type: Number,
      },
      store: { type: Schema.Types.ObjectId, ref: "stores" },
      realquntity:{
        type: Number
      },
      balancefromstorebefore:{
        type:Number
      },
      balancefromstoreafter:{
        type:Number
      },
      balancetostorebefore:{
        type:Number
      },
      balancetostoreafter:{
        type:Number
      }
    }
  ]
});
module.exports = mongoose.model("transferproducts", TransferProductSchema);
