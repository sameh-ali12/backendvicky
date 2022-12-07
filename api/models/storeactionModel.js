"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var StoreActionSchema = new Schema({
  daterecived: {
    type: Date
    },
  buyinside: {
    status: {
      type: Boolean,
      default:false
    },
    billid: { type: Schema.Types.ObjectId, ref: "partnersells" },
    date: {
      type: Date
    },
  },
  sellinside: {
    status: {
      type: Boolean,
      default:false
    },
    billid: { type: Schema.Types.ObjectId, ref: "partnersells" },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  buyfromsupplier: {
    status: {
      type: Boolean,
      default:false
    },
    billid: { type: Schema.Types.ObjectId, ref: "buyfromsuppliers" },
    date: {
      type: Date
    },
  },
  selltoclients: {
    status: {
      type: Boolean,
      default:false

    },
    billid: { type: Schema.Types.ObjectId, ref: "selltoclients" },
    date: {
      type: Date,
    },
  },
  rebackfromsupplier: {
    status: {
      type: Boolean,
      default:false

    },
    billid: { type: Schema.Types.ObjectId, ref: "buyfromsuppliers" },
    date: {
      type: Date
    }
  },
  rebackselltoclients: {
    status: {
      type: Boolean,
      default:false

    },
    billid: { type: Schema.Types.ObjectId, ref: "selltoclients" },
    date: {
      type: Date
    },
  },
  carupload: {
    status: {
      type: Boolean,
      default:false
    },
    caruploadid: { type: Schema.Types.ObjectId, ref: "caruploads" },
    date: {
      type: Date
        },
  },
  transferproducts: {
    status: {
      type: Boolean,
      default:false
    },
    transferid: { type: Schema.Types.ObjectId, ref: "transferproducts" },
    date: {
      type: Date
    },
  },
  sellfromstore: {
    status: {
      type: Boolean,
      default:false

    },
    billid: { type: Schema.Types.ObjectId, ref: "selltoclients" },
    date: {
      type: Date
    },
  },
  cardownload: {
    status: {
      type: Boolean,
      default:false
    },
    cardownloadid: { type: Schema.Types.ObjectId, ref: "cardownloads" },
    date: {
      type: Date
    },
  }
  ,
  user: { type: Schema.Types.ObjectId, ref: "User" },
  store:{ type: Schema.Types.ObjectId, ref: "stores" },
  productlist:[{ productid: {type: Schema.Types.ObjectId, ref:"products"} }]
});

module.exports = mongoose.model("storeactions", StoreActionSchema);
