"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var LiquidationSchema = new Schema({
  foruser: { type: Schema.Types.ObjectId, ref: "User" },
  touser: { type: Schema.Types.ObjectId, ref: "User" },
  Date: {
    type: Date
    },
  value: {
    type: Number
  },
  sellbills: [{ type: Schema.Types.ObjectId, ref: "partnersells" }],
  buybills: [{ type: Schema.Types.ObjectId, ref: "partnersells" }],
  transferfromus: [{ type: Schema.Types.ObjectId, ref: "transfers" }],
  transferfromhim: [{ type: Schema.Types.ObjectId, ref: "transfers" }],
});
module.exports = mongoose.model("liquidations", LiquidationSchema);
