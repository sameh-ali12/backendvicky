"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var TreasuryActionSchema = new Schema({
  buyinside: {
    status: {
      type: Boolean,
      default:false
    },
    billid: { type: Schema.Types.ObjectId, ref: "partnersells" },
    date: {
      type: Date,
    },
    treasuryvalue:{type:Number},
    checktreasuryvalue:{type:Number}
  },
  sellinside: {
    status: {
      type: Boolean,
      default:false

    },
    billid: { type: Schema.Types.ObjectId, ref: "partnersells" },
    date: {
      type: Date,
    },
    treasuryvalue:{type:Number},
    checktreasuryvalue:{type:Number}
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
    treasuryvalue:{type:Number},
    checktreasuryvalue:{type:Number}
  },
  selltoclients: {
    status: {
      type: Boolean,
      default:false
    },
    billid: { type: Schema.Types.ObjectId, ref: "selltoclients" },
    date: {
      type: Date
    },
    treasuryvalue:{type:Number},
    checktreasuryvalue:{type:Number}
  },
  rebackfromsupplier: {
    status: {
      type: Boolean,
      default:false
    },
    billid: { type: Schema.Types.ObjectId, ref: "buyfromsuppliers" },
    date: {
      type: Date
    },
    treasuryvalue:{type:Number},
    checktreasuryvalue:{type:Number}
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
    treasuryvalue:{type:Number},
    checktreasuryvalue:{type:Number}
  },
  partnertransfermoney: {
    status: {
      type: Boolean,
      default:false
    },
    transferid: { type: Schema.Types.ObjectId, ref: "transfers" },
    date: {
      type: Date
    },
    treasuryvalue:{type:Number},
    checktreasuryvalue:{type:Number}
  },
  paymenttosuppliers: {
    status: {
      type: Boolean,
      default:false
    },
    paymenttosupplierid: { type: Schema.Types.ObjectId, ref: "paymenttosuppliers" },
    date: {
      type: Date
    },
    treasuryvalue:{type:Number},
    checktreasuryvalue:{type:Number}
  },
  checkadd: {
    status: {
      type: Boolean,
      default:false

    },
    checkid: { type: Schema.Types.ObjectId, ref: "checks" },
    date: {
      type: Date
    },
    treasuryvalue:{type:Number},
    checktreasuryvalue:{type:Number}
  },
  checkcash: {
    status: {
      type: Boolean,
      default:false

    },
    checkid: { type: Schema.Types.ObjectId, ref: "checks" },
    date: {
      type: Date
    },
    treasuryvalue:{type:Number},
    checktreasuryvalue:{type:Number}
  },
  checkreback: {
    status: {
      type: Boolean,
      default:false
    },
    checkid: { type: Schema.Types.ObjectId, ref: "checks" },
    date: {
      type: Date
    },
    treasuryvalue:{type:Number},
    checktreasuryvalue:{type:Number}
  },
  paymentfromclients: {
    status: {
      type: Boolean,
      default:false
    },
    paymentid: { type: Schema.Types.ObjectId, ref: "paymentfromclients" },
    date: {
      type: Date
    },
    treasuryvalue:{type:Number},
    checktreasuryvalue:{type:Number}
  },
  expenses: {
    status: {
      type: Boolean,
      default:false
    },
    expensesid: { type: Schema.Types.ObjectId, ref: "expenses" },
    date: {
      type: Date
    },
    treasuryvalue:{type:Number},
    checktreasuryvalue:{type:Number}
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
    treasuryvalue:{type:Number},
    checktreasuryvalue:{type:Number}
  },
  treasury: { type: Schema.Types.ObjectId, ref: "treasuries" },
  user:{ type: Schema.Types.ObjectId, ref: "User" },
  date: {
    type: Date
  }
});
module.exports = mongoose.model("treasuryactions", TreasuryActionSchema);
