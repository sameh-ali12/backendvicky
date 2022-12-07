"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var PaymentFromClientsSchema = new Schema({
  value: {
    type: Number
  },
  daterecived: {
    type: Date
    },
  note: {
    type: String
  },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  client: { type: Schema.Types.ObjectId, ref: "clients" },
  totreasury:{ type: Schema.Types.ObjectId, ref: "treasuries" },
  balancebefore:{
    type:Number
  },
  balanceafter:{
    type:Number
  }
});
module.exports = mongoose.model("PaymentFromClients", PaymentFromClientsSchema);
