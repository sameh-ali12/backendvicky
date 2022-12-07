"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SalesSchema = new Schema({
  name: {
    type: String,
  },
  phonenumber: {
    type: String,
  },
  note: {
    type: String,
  },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  carstore: [
    {
      productid: { type: Schema.Types.ObjectId, ref: "products"},  
      quntity: {
        type: Number,
      }
    },
  ],
});
module.exports = mongoose.model("sales", SalesSchema);
