"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var BuyFromSuppliersSchema = new Schema({
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
  treasury: { type: Schema.Types.ObjectId, ref: "treasuries" },
  store: { type: Schema.Types.ObjectId, ref: "stores" },
  supplier: { type: Schema.Types.ObjectId, ref: "suppliers" },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  forclient: {
    type: Boolean,
    default: false,
  },
  client: { type: Schema.Types.ObjectId, ref: "clients" },
  balancebefore:{
    type: Number
  },
  balanceafter:{
    type: Number
  },
  note: {
    type: String
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
      }
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
          unitname: {
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
      balancestorebefore:{
        type:Number
      },
      balancestoreafter:{
        type:Number
      },
          fromstore: { type: Schema.Types.ObjectId, ref: "stores" },
        },
      ],
      totalamount: { type: Number },
      cash: { type: Number },
      treasury: { type: Schema.Types.ObjectId, ref: "treasuries" },
      note: { type: String },
      balancebefore:{
        type: Number
      },
      balanceafter:{
        type: Number
      }
    },
  ],
});
module.exports = mongoose.model("buyfromsuppliers", BuyFromSuppliersSchema);
