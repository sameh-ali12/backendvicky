"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ClientandsupplierActionSchema = new Schema({
  date: {
    type: Date,
  },
  buyfromsupplier: {
    status: {
      type: Boolean,
      default: false,
    },
    billid: { type: Schema.Types.ObjectId, ref: "buyfromsuppliers" },
    date: {
      type: Date,
    },
  },
  selltoclients: {
    status: {
      type: Boolean,
      default: false,
    },
    billid: { type: Schema.Types.ObjectId, ref: "selltoclients" },
    date: {
      type: Date,
    },
  },
  rebackfromsupplier: {
    status: {
      type: Boolean,
      default: false,
    },
    billid: { type: Schema.Types.ObjectId, ref: "buyfromsuppliers" },
    date: {
      type: Date,
    },
  },
  rebackselltoclients: {
    status: {
      type: Boolean,
      default: false,
    },
    billid: { type: Schema.Types.ObjectId, ref: "selltoclients" },
    date: {
      type: Date,
    },
  },
  sellfromstore: {
    status: {
      type: Boolean,
      default: false,
    },
    billid: { type: Schema.Types.ObjectId, ref: "selltoclients" },
    date: {
      type: Date,
    },
  },
  paymentfromclients: {
    status: {
      type: Boolean,
      default:false
    },
    paymentid: { type: Schema.Types.ObjectId, ref: "paymentfromclients" },
    date: {
      type: Date
    }
  },
  discountforclients: {
    status: {
      type: Boolean,
      default:false
    },
    discountid: { type: Schema.Types.ObjectId, ref: "discounttoclients" },
    date: {
      type: Date
    }
  },
  paymenttosuppliers: {
    status: {
      type: Boolean,
      default:false
    },
    paymenttosupplierid: { type: Schema.Types.ObjectId, ref: "paymenttosuppliers" },
    date: {
      type: Date
    }
  },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  forsupplier: {
    type: Boolean,
    default: false
  },
  client: { type: Schema.Types.ObjectId, ref: "clients" },
  supplier: { type: Schema.Types.ObjectId, ref: "suppliers" },
  user:{ type: Schema.Types.ObjectId, ref: "User" }
});
module.exports = mongoose.model("clientandsupplieractions", ClientandsupplierActionSchema);
