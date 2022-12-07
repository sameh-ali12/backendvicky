"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ExpensesCatSchema = new Schema({
  name: {
    type: String,
  },
  user: { type: Schema.Types.ObjectId, ref: "User" }
});
module.exports = mongoose.model("expensescat", ExpensesCatSchema);
