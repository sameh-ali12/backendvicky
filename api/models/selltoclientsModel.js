"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var SellToClientsSchema = new Schema({

  billno: {
    type: Number,
    unique: true,
  },
  totalamount: {
    type: Number,
  },
  cashed: {
    type: Number,
  },
  discount:{
    type: Number
  },
  treasury: { type: Schema.Types.ObjectId, ref: "treasuries" },
  sales: { type: Schema.Types.ObjectId, ref: "sales" },
  client: { type: Schema.Types.ObjectId, ref: "clients" },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  balancebefore:{
    type:Number
  },
  balanceafter:{
    type:Number
  },
  note: {
    type: String,
  },
  date: {
    type: Date
  },
  details: [
    {
      productid: { type: Schema.Types.ObjectId, ref: "products" },
      unitname: {
        type: String,
      },
      unit: {
        type: String,
      },
      price: {
        type: Number,
      },
      quntity: {
        type: Number,
      },
      realquntity: {
        type: Number,
      },
      
      balancestorebefore:{
        type:Number
      },
      balancestoreafter:{
        type:Number
      },

      fromstore: { type: Schema.Types.ObjectId, ref: "stores" }
    },
  ],
  rebackstatus: {
    type: Boolean,
    default: false,
  },
  rebackdetails: [
    {
      rebackdate: {
        type: Date,
      },
      details: [
        {
          productid: { type: Schema.Types.ObjectId, ref: "products" },
          productname: {
            type: String,
          },
          unit: {
            type: String,
          },
          quntity: {
            type: Number,
          },
          price: {
            type: Number,
          },
          realquntity: {
            type: Number,
          },
          unitname:{
            type:String
          },
      balancestorebefore:{
        type:Number
      },
      balancestoreafter:{
        type:Number
      }
        }
      ],
      tostore: { type: Schema.Types.ObjectId, ref: "stores" },
      totalamount:{type:Number},
      cash:{type:Number},
      treasury: { type: Schema.Types.ObjectId, ref: "treasuries" },
      note:{type:String},
      balancebefore:{type:Number},
      balanceafter:{type:Number}
    },
  ],
  directfromstore:{
    type:Boolean,
    default:false
  },
  forsupplier:{
    type:Boolean,
    default:false
  },
  supplier: { type: Schema.Types.ObjectId, ref: "suppliers" }
});
module.exports = mongoose.model("selltoclients", SellToClientsSchema);
