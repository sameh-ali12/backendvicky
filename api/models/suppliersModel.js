"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SuppliersSchema = new Schema({
  name: {
    type: String
  },
  phonenumber:{  
      type: String
  },
  address:{
    type: String
  },
  notes:{
    type: String
  },
  value:{
    type:Number,
    default:0
  },
  user: { type: Schema.Types.ObjectId, ref: "User" }
});
module.exports = mongoose.model("suppliers", SuppliersSchema);
