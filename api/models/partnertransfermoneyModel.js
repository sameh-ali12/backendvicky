"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var status = ["refuse", "accept", "underprocess"];
var TransferMoneySchema = new Schema({
  value: {
    type: Number,
  },
  dateaction: {
    type: Date
  },
  daterecived: {
    type: Date
  },
  note: {
    type: String,
  },
  status: {
    type: String,
    enum: status,
    default: "underprocess",
  },
  reading: {
    type: Boolean,
    default: false
  },
  from: { type: Schema.Types.ObjectId, ref: "User" },
  to: { type: Schema.Types.ObjectId, ref: "User" },
  fromtreasury: { type: Schema.Types.ObjectId, ref: "treasuries" },
  totreasury: { type: Schema.Types.ObjectId, ref: "treasuries" }
});
module.exports = mongoose.model("transfers", TransferMoneySchema);
