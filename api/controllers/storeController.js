"use strict";
var mongoose = require("mongoose"),
  Store = mongoose.model("stores"),
  Product = mongoose.model("products");

exports.addstore = function (req, res) {
  var newStore = new Store(req.body);
  newStore.save(function (err, store) {
    if (err) {
      return res.status(400).send({
        message: err,
      });
    } else {
      return res.json({ code: 100, obj: store });
    }
  });
};
exports.allstores = function (req, res) {
  Store.find({ user: req.params.userid }, function (err, stores) {
    if (err) {
      return res.json({ code: 21, message: err });
    } else {
      return res.json({ code: 100, obj: stores });
    }
  });
};

exports.singlestore = function (req, res) {
  Store.find({ _id: req.params.id }, function (err, store) {
    if (err) {
      return res.json({ code: 21, message: err });
    } else {
      return res.json({ code: 100, obj: store });
    }
  });
};

exports.deletestore = function (req, res) {
  Store.findOneAndRemove({ _id: req.params.id }, function (err, store) {
    if (err) {
      return res.json({ code: 21, message: err });
    } else {
      return res.json({ code: 100, obj: store });
    }
  });
};

exports.inventorywithsingleproductandsinglestore = function (req, res) {
  Store.find(
    {
      _id: req.params.store,
      user: req.params.user,
      "products.productid": req.params.productid,
    },
    function (err, stores) {
      if (err) {
        return res.json({ code: 21, message: err });
      } else {
        return res.json({ code: 100, obj: stores });
      }
    }
  ).populate("products.productid");
};


exports.detailssumproducts = function (req, res) {
  Store.find(
    {
      user: req.params.user,
      "products.productid": req.params.productid,
    },
    function (err, stores) {
      if (err) {
        return res.json({ code: 21, message: err });
      } else {
        return res.json({ code: 100, obj: stores });
      }
    }
  ).populate("products.productid");
};


exports.inventorywithsinglestoreandallproducts = function (req, res) {
  Store.find(
    {
      _id: req.params.store,
      user: req.params.user
    },
    function (err, stores) {
      if (err) {
        return res.json({ code: 21, message: err });
      } else {
        return res.json({ code: 100, obj: stores });
      }
    }
  ).populate("products.productid");
};

exports.inventorywithallproductandallstores = function (req, res) {
  Store.aggregate([
    { $match: { user: mongoose.Types.ObjectId(req.params.user)}},
    { $unwind: "$products" },
    {
      $group: {
        _id: "$products.productid",
        sum: { $sum: "$products.quantity" },
      },
    }
  ]).exec(function (err, doc) {
    if (err) return res.send(err);
    else {
      Product.populate(doc, { path: "_id" }, function (err) {
        if (err) return res.send(err);
        return res.json({code:100,obj:doc});
      });
    }
  });
};




