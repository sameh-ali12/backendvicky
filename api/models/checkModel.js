"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var checkstatus= ['cashed','expire','underprocess','reback'];
var ChecksSchema = new Schema({
  checkno: {
    type: Number
  },
  value: {
    type: Number
  },
  dateexpire: {
    type: Date
  },
  daterecived: {
    type: Date
    },
  note: {
    type: String
  },
  status:{
    type: String,
    enum:  checkstatus,
    default:'underprocess'
  },
  dateaction:{
    type:Date
  },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  client: { type: Schema.Types.ObjectId, ref: "clients" },
  treasury: { type: Schema.Types.ObjectId, ref: "treasuries" }
});
module.exports = mongoose.model("checks", ChecksSchema);
