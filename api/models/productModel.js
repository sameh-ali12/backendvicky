"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
  name: {
    type: String,
    Required: "Kindly enter the name of product",
  },
  bigunit: {
    type: String,
  },
  smallunit: {
    type: String,
  },
  countunit: {
    type: Number,
  },
  sellprice:{
    type: Number,
  },
  buyprice:{
    type: Number,
  },
  user: { type: Schema.Types.ObjectId, ref: "User" }
});
module.exports = mongoose.model("products", ProductSchema);
