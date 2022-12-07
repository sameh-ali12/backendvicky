"use strict";
var mongoose = require("mongoose"),
Suppliers = mongoose.model("suppliers");
exports.addsuppliers = function (req, res) {
  var newSuppliers = new Suppliers(req.body);
  newSuppliers.save(function (err, suppliers) {
    if (err) {
      return res.status(400).send({
        message: err,
      });
    } else {
      return res.json({ code: 100, obj: suppliers });
    }
  });
};
exports.allSuppliers = function (req, res) {
  Suppliers.find({ user: req.params.userid }, function (err,suppliers) {
    if (err) {
      return res.json({ code: 21, message: err });
    } else {
      return res.json({ code: 100, obj: suppliers });
    }
  });
};
exports.deletesuppliers = function (req, res) {
  Suppliers.findOneAndRemove({ _id: req.params.id }, function (err, suppliers) {
    if (err) {
      return res.json({ code: 21, message: err });
    } else {
      return res.json({ code: 100, obj: suppliers });
    }
  });
};

exports.singleSupplier = function (req, res) {
  Suppliers.find({ _id: req.params.id }, function (err,suppliers) {
    if (err) {
      return res.json({ code: 21, message: err });
    } else {
      return res.json({ code: 100, obj: suppliers });
    }
  });
};