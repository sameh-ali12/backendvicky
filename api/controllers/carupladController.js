"use strict";
var mongoose = require("mongoose"),
  CarUpload = mongoose.model("caruploads"),
  Store = mongoose.model("stores"),
  StoreActions = mongoose.model("storeactions"),
  ProductActions = mongoose.model("productactions"),
  Sales = mongoose.model("sales");

exports.addcarupload = function (req, res) {
  var carupload = new CarUpload(req.body);
  carupload.save(function (err, upload) {
    if (err) {
      return res.status(400).send({
        message: err,
      });
    } else {
      /////edit store
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
                    carupload: {
                      status: true,
                      caruploadid: upload._id,
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
                      Sales.find(
                        { _id: req.body.sales },
                        function (err, sales) {
                          if (err) {
                            return res.json({ code: 21, message: err });
                          } else {
                            var details = sales[0].carstore;
                            for (const index1 in req.body.details) {
                              var flag = false;
                              for (const index2 in details) {
                                if (
                                  req.body.details[index1].productid ==
                                  details[index2].productid
                                ) {
                                  details[index2].quntity +=
                                    req.body.details[index1].realquntity;
                                  flag = true;
                                }
                              }
                              if (flag == false) {
                                details.push({
                                  productid: req.body.details[index1].productid,
                                  quntity: req.body.details[index1].realquntity,
                                });
                              }
                            }
                            sales[0].carstore = details;
                            Sales.findOneAndUpdate(
                              { _id: sales[0]._id },
                              sales[0],
                              function (err, obj) {
                                if (err) return err;
                                else {
                                  return res.json({ code: 100, obj: upload });
                                }
                              }
                            );
                          }
                        }
                      );
                    }
                  });
                }
              }
            );
          }
        });
      }
    }
  });
};

exports.carupload = function (req, res) {
  CarUpload.find(
    {
      user: req.params.userid,
      daterecived: req.params.date,
      sales: req.params.sales,
    },
    function (err, upload) {
      if (err) {
        return res.json({ code: 21, message: err });
      } else {
        return res.json({ code: 100, obj: upload });
      }
    }
  )
    .populate("user")
    .populate("sales")
    .populate("itineraries")
    .populate("details.productid")
    .populate("details.fromstore");
};

//////reports
exports.caruploadwithsales = function (req, res) {
  CarUpload.find(
    { user: req.params.userid, sales: req.params.sales },
    function (err, upload) {
      if (err) {
        return res.json({ code: 21, message: err });
      } else {
        return res.json({ code: 100, obj: upload });
      }
    }
  )
    .populate("user")
    .populate("sales")
    .populate("itineraries")
    .populate("details.productid")
    .populate("details.store");
};

exports.caruploadwithstore = function (req, res) {
  CarUpload.find(
    { user: req.params.userid, "details.store": req.params.store },
    function (err, upload) {
      if (err) {
        return res.json({ code: 21, message: err });
      } else {
        return res.json({ code: 100, obj: upload });
      }
    }
  )
    .populate("user")
    .populate("sales")
    .populate("itineraries")
    .populate("details.productid")
    .populate("details.store");
};

exports.caruploadwithstoreanddate = function (req, res) {
  CarUpload.find(
    {
      user: req.params.userid,
      "details.store": req.params.store,
      daterecived: { $gte: req.params.from, $lt: req.params.to },
    },
    function (err, upload) {
      if (err) {
        return res.json({ code: 21, message: err });
      } else {
        return res.json({ code: 100, obj: upload });
      }
    }
  )
    .populate("user")
    .populate("sales")
    .populate("itineraries")
    .populate("details.productid")
    .populate("details.store");
};

exports.caruploadwithsalesanddate = function (req, res) {
  CarUpload.find(
    {
      user: req.params.userid,
      sales: req.params.sales,
      daterecived: { $gte: req.params.from, $lt: req.params.to },
    },
    function (err, upload) {
      if (err) {
        return res.json({ code: 21, message: err });
      } else {
        return res.json({ code: 100, obj: upload });
      }
    }
  )
    .populate("user")
    .populate("sales")
    .populate("itineraries")
    .populate("details.productid")
    .populate("details.store");
};

exports.caruploadwithsalesandstore = function (req, res) {
  CarUpload.find(
    {
      user: req.params.userid,
      sales: req.params.sales,
      "details.store": req.params.store,
    },
    function (err, upload) {
      if (err) {
        return res.json({ code: 21, message: err });
      } else {
        return res.json({ code: 100, obj: upload });
      }
    }
  )
    .populate("user")
    .populate("sales")
    .populate("itineraries")
    .populate("details.productid")
    .populate("details.store");
};

exports.caruploadwithstoreandsalesanddate = function (req, res) {
  CarUpload.find(
    {
      user: req.params.userid,
      sales: req.params.sales,
      "details.store": req.params.store,
      daterecived: { $gte: req.params.from, $lt: req.params.to },
    },
    function (err, upload) {
      if (err) {
        return res.json({ code: 21, message: err });
      } else {
        return res.json({ code: 100, obj: upload });
      }
    }
  )
    .populate("user")
    .populate("sales")
    .populate("itineraries")
    .populate("details.productid")
    .populate("details.store");
};
