"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var StoreSchema = new Schema({
  name: {
    type: String,
  },
  address: {
    type: String,
  },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  products:[{
    productid:{ type: Schema.Types.ObjectId, ref: "products" },
    quantity:{
      type: Number,
      min: 0,
    }
  }]
});
module.exports = mongoose.model("stores", StoreSchema);
