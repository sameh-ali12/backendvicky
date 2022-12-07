"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var status= ['refuse','accept','underprocess'];
var PartnerSellSchema = new Schema({

  total: {
    type: Number
  },
  cashed: {
    type: Number
  },
  status: {
    type: String,
    enum:  status,
    default:'underprocess'
  },
  daterecived: {
    type: Date
    },
  dateaction:{
    type: Date
    },
  note: {
    type: String
  },
  from: { type: Schema.Types.ObjectId, ref: "User" },
  to: { type: Schema.Types.ObjectId, ref: "User"},
reading:{
  type:Boolean,
  default:false
},
fromtreasury:{ type: Schema.Types.ObjectId, ref: "treasuries" },
totreasury:{ type: Schema.Types.ObjectId, ref: "treasuries" },
details:[{
  productid:{ type: Schema.Types.ObjectId, ref: "products" },
  unit:{
    type:String
  },
  unitname:{
    type:String
  },
  price:{
    type:String
  },
  quntity:{
    type:Number
  },
  viewquntity:{
    type:Number
  },
  fromstore:{ type: Schema.Types.ObjectId, ref: "stores" },
}],
tostore:{ type: Schema.Types.ObjectId, ref: "stores" }
});
module.exports = mongoose.model("partnersells", PartnerSellSchema);
