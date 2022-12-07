"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TreasurySchema = new Schema({
  name: {
    type: String,
  },
  note: {
    type: String,
  },
  value:{
    type:Number,
    default:0
  },
  valuechecks:{
    type:Number,
    default:0
  },
  user: { type: Schema.Types.ObjectId, ref: "User" }
});
module.exports = mongoose.model("treasuries", TreasurySchema);
