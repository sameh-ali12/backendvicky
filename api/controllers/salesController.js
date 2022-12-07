"use strict";
var mongoose = require("mongoose"),
  Sales = mongoose.model("sales");
exports.addsales = function (req, res) {
  var newSales = new Sales(req.body);
  newSales.save(function (err, sales) {
    if (err) {
      return res.status(400).send({
        message: err,
      });
    } else {
      return res.json({ code: 100, obj: sales });
    }
  });
};
exports.allsales = function (req, res) {
  Sales.find({ user: req.params.userid }, function (err,sales) {
    if (err) {
      return res.json({ code: 21, message: err });
    } else {
      return res.json({ code: 100, obj: sales });
    }
  });
};
exports.deletesales = function (req, res) {
  Sales.findOneAndRemove({ _id: req.params.id }, function (err, sales) {
    if (err) {
      return res.json({ code: 21, message: err });
    } else {
      return res.json({ code: 100, obj: sales });
    }
  });
};


exports.updatesales = function (req, res) {
  Sales.findOneAndUpdate({ _id: req.params.id },req.body, function (err, sales) {
    if (err) {
      return res.json({ code: 21, message: err });
    } else {
      return res.json({ code: 100, obj: sales });
    }
  });
};

exports.getonesalesdata = function (req, res) {
  Sales.findOne({ _id: req.params.id }, function (err, sales) {
    if (err) {
      return res.json({ code: 21, message: err });
    } else {
      return res.json({ code: 100, obj: sales });
    }
  }).populate('carstore.productid');

};


