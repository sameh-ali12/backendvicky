"use strict";
var mongoose = require("mongoose"),
  TransferProduct = mongoose.model("transferproducts"),
  Store = mongoose.model("stores"),
  StoreActions = mongoose.model("storeactions"),
  ProductActions = mongoose.model("productactions");

exports.addtransferproduct = function (req, res) {
  var transferproduct = new TransferProduct(req.body);
  transferproduct.save(function (err, transfer) {
    if (err) {
      return res.status(400).send({
        message: err,
      });
    } else {
      /////update from store
      var stores = [];
      for (const index in req.body.details) {
        var flag = false;
        for (const index2 in stores) {
          if (req.body.details[index].store == stores[index2]) {
            flag = true;
          }
        }
        if (flag == false) {
          stores.push(req.body.details[index].store);
        }
      }
      var fullobj = [];
      var products = req.body.details;
      for (const index in stores) {
        var obj = { store: stores[index], products: [] };
        for (const index2 in products) {
          if (products[index2].store == stores[index]) {
            obj.products.push(products[index2]);
          }
        }
        fullobj.push(obj);
        obj = {};
      }
      console.log(fullobj);
      for (const index in fullobj) {
        Store.find({ _id: fullobj[index].store }, function (err, store) {
          if (err) {
            return res.json({ code: 21, message: err });
          } else {
            for (const index1 in fullobj[index].products) {
              var flag = false;
              for (const index2 in store[0].products) {
                if (
                  store[0].products[index2].productid ==
                  fullobj[index].products[index1].productid
                ) {
                  store[0].products[index2].quantity =
                    store[0].products[index2].quantity -
                    fullobj[index].products[index1].realquntity;
                }
              }
            }
            Store.findOneAndUpdate(
              { _id: store[0]._id },
              store[0],
              function (err, obj) {
                if (err) {
                  return res.json({ code: 21, message: err });
                } else {
                  var obj = {
                    transferproducts: {
                      status: true,
                      transferid: transfer._id,
                      date: req.body.daterecived,
                    },
                    user: req.body.user,
                    store: store[0]._id,
                    daterecived: req.body.daterecived,
                    productlist: req.body.details,
                  };
                  var newStoreAction = new StoreActions(obj);
                  newStoreAction.save(function (err, action) {
                    if (err) {
                      return res.status(400).send({
                        message: err,
                      });
                    } else {
                    }
                  });
                }
              }
            );
          }
        });
      }
      //// adding quantity to store and add store action
      Store.find({ _id: req.body.tostore }, function (err, store) {
        if (err) {
          return res.json({ code: 21, message: err });
        } else {
          for (const index in req.body.details) {
            var flag = false;
            for (const index2 in store[0].products) {
              if (
                store[0].products[index2].productid ==
                req.body.details[index].productid
              ) {
                flag = true;
                store[0].products[index2].quantity =
                  store[0].products[index2].quantity +
                  req.body.details[index].realquntity;
              }
            }
            if (flag == false) {
              store[0].products.push({
                productid: req.body.details[index].productid,
                quantity: req.body.details[index].realquntity,
              });
            }
          }
          Store.findOneAndUpdate(
            { _id: store[0]._id },
            store[0],
            function (err, obj) {
              if (err) {
                return res.json({ code: 21, message: err });
              } else {
                var obj = {
                  transferproducts: {
                    status: true,
                    transferid: transfer._id,
                  },
                  user: transfer.user,
                  store: transfer.tostore,
                  productlist: req.body.details,
                };
                var newStoreAction = new StoreActions(obj);
                newStoreAction.save(function (err, action) {
                  if (err) {
                    return res.status(400).send({
                      message: err,
                    });
                  } else {
                  }
                });
              }
            }
          );
        }
      });
      return res.json({ code: 100, obj: transfer });
    }
  });
};
/////reports
exports.transferproductsfromstore = function (req, res) {
  TransferProduct.find(
    { user: req.params.user, "details.store": req.params.store },
    function (err, transfer) {
      if (err) {
        return res.json({ code: 21, message: err });
      } else {
        return res.json({ code: 100, obj: transfer });
      }
    }
  )
    .populate("details.productid")
    .populate("details.store")
    .populate("tostore");
};
exports.transferproductstostore = function (req, res) {
  TransferProduct.find(
    { user: req.params.user, tostore: req.params.store },
    function (err, transfer) {
      if (err) {
        return res.json({ code: 21, message: err });
      } else {
        return res.json({ code: 100, obj: transfer });
      }
    }
  )
    .populate("details.productid")
    .populate("details.store")
    .populate("tostore");
};
exports.transferproductstostoreanddate = function (req, res) {
  TransferProduct.find(
    {
      user: req.params.user,
      tostore: req.params.store,
      daterecived: { $gte: req.params.from, $lt: req.params.to },
    },
    function (err, transfer) {
      if (err) {
        return res.json({ code: 21, message: err });
      } else {
        return res.json({ code: 100, obj: transfer });
      }
    }
  )
    .populate("details.productid")
    .populate("details.store")
    .populate("tostore");
};
exports.transferproductsfromstoreanddate = function (req, res) {
  TransferProduct.find(
    {
      user: req.params.user,
      "details.store": req.params.store,
      daterecived: { $gte: req.params.from, $lt: req.params.to },
    },
    function (err, transfer) {
      if (err) {
        return res.json({ code: 21, message: err });
      } else {
        return res.json({ code: 100, obj: transfer });
      }
    }
  )
    .populate("details.productid")
    .populate("details.store")
    .populate("tostore");
};
