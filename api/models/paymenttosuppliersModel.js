"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var PaymentToSuppliersSchema = new Schema({
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
  supplier: { type: Schema.Types.ObjectId, ref: "suppliers" },
  fromtreasury:{ type: Schema.Types.ObjectId, ref: "treasuries" }
});
module.exports = mongoose.model("paymenttosuppliers", PaymentToSuppliersSchema);
