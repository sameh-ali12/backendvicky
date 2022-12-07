"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ClientsSchema = new Schema({
  name: {
    type: String,
  },
  address: {
    type: String,
  },
phonenumber: {
    type: String,
  },
  debtvalue:{
    type:Number,
    default:0
  },
  checksvalue:{
    type:Number,
    default:0
  },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  itineraries: { type: Schema.Types.ObjectId, ref: "itineraries" }
});
module.exports = mongoose.model("clients", ClientsSchema);
