"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var CarUploadSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  daterecived: {
    type: Date
    },
  note: {
    type: String,
  },
  sales: { type: Schema.Types.ObjectId, ref: "sales" },
  itineraries: { type: Schema.Types.ObjectId, ref: "itineraries" },
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
      
      balancestorebefore:{
        type:Number
      },
      balancestoreafter:{
        type:Number
      }
    }
  ]
});
module.exports = mongoose.model("caruploads", CarUploadSchema);
