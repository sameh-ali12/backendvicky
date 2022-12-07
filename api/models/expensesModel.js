"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ExpensesSchema = new Schema({
  value: {
    type: Number
  },
  date:{
    type: Date
  },
  notes:{
    type: String
  },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  cat: { type: Schema.Types.ObjectId, ref: "expensescat" },
  fromtreasury: {type: Schema.Types.ObjectId, ref: "treasuries" }
});
module.exports = mongoose.model("expenses", ExpensesSchema);
