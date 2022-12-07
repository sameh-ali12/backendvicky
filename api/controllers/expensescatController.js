"use strict";
var mongoose = require("mongoose"),
  Expensescat = mongoose.model("expensescat");
exports.addexpenses = function (req, res) {
  var newExpenses = new Expensescat(req.body);
  newExpenses.save(function (err, cat) {
    if (err) {
      return res.status(400).send({
        message: err,
      });
    } else {
      return res.json({ code: 100, obj: cat });
    }
  });
};
exports.allexpenses = function (req, res) {
  Expensescat.find({ user: req.params.userid }, function (err, cats) {
    if (err) {
      return res.json({ code: 21, message: err });
    } else {
      return res.json({ code: 100, obj: cats });
    }
  });
};
exports.deleteexpenses = function (req, res) {
  Expensescat.findOneAndRemove({ _id: req.params.id }, function (err, cats) {
    if (err) {
      return res.json({ code: 21, message: err });
    } else {
      return res.json({ code: 100, obj: cats });
    }
  });
};