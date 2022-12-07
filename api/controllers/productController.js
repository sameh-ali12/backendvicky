"use strict";
var mongoose = require("mongoose"),
  Product = mongoose.model("products");
exports.addproduct = function (req, res) {
  var newProduct = new Product(req.body);
  newProduct.save(function (err, product) {
    if (err) {
      return res.status(400).send({
        message: err,
      });
    } else {
      return res.json({ code: 100, obj: product });
    }
  });
};
exports.allproducts = function (req, res) {
  Product.find({}, function (err, products) {
    if (err) {
      return res.json({ code: 21, message: err });
    } else {
      return res.json({code:100,obj:products});
    }
  });
};
exports.deleteproduct = function (req, res) {
  Product.findOneAndRemove({ _id: req.params.id }, function (err, products) {
    if (err) {
      return res.json({ code: 21, message: err });
    } else {
      return res.json({code:100,obj:products});
    }
  });
};
exports.singleproduct = function (req, res) {
  Product.find({_id:req.params.id}, function (err, products) {
    if (err) {
      return res.json({ code: 21, message: err });
    } else {
      return res.json({code:100,obj:products});
    }
  });
};

exports.editproduct = function (req, res) {
  Product.findOneAndUpdate({_id:req.params.id},req.body, function (err, products) {
    if (err) {
      return res.json({ code: 21, message: err });
    } else {
      return res.json({code:100,obj:products});
    }
  });
};