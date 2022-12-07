"use strict";

const { copyFileSync } = require("fs");

var mongoose = require("mongoose"),
  BuyFromSuppliers = mongoose.model("buyfromsuppliers"),
  Store = mongoose.model("stores"),
  StoreActions = mongoose.model("storeactions"),
  Treasury = mongoose.model("treasuries"),
  TreasuryActions = mongoose.model("treasuryactions"),
  Suppliers = mongoose.model("suppliers"),
  Clients = mongoose.model("clients"),
  ClientandSupplierActions = mongoose.model("clientandsupplieractions"),
  ClientsActions = mongoose.model("clientandsupplieractions"),
  ProductActions = mongoose.model("productactions");
exports.addbuybill = function (req, res) {
  BuyFromSuppliers.countDocuments(function (err, c) {
    if (err) {
      return err;
    } else {
      req.body.billno = c + 1;
      var newbuysupplier = new BuyFromSuppliers(req.body);
      newbuysupplier.save(function (err, bill) {
        if (err) {
          return res.status(400).send({
            message: err,
          });
        } else {
          //// adding quantity to store and add store action
          Store.find({ _id: req.body.store }, function (err, store) {
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
                      buyfromsupplier: {
                        status: true,
                        billid: bill._id,
                        date: req.body.date,
                      },
                      user: bill.user,
                      store: bill.store,
                      daterecived: req.body.date,
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
          ///adding client and supplier acation
          if (req.body.forclient == true) {
            var obj = {
              buyfromsupplier: {
                status: true,
                billid: bill._id,
                date: req.body.date,
              },
              user: bill.user,
              date: req.body.date,
              forsupplier: false,
              client: req.body.client,
            };
          } else {
            var obj = {
              buyfromsupplier: {
                status: true,
                billid: bill._id,
                date: req.body.date,
              },
              user: bill.user,
              date: req.body.date,
              forsupplier: true,
              supplier: req.body.supplier,
            };
          }
          var newdoc = new ClientandSupplierActions(obj);
          newdoc.save(function (err, action) {
            if (err) {
              console.log(err);
            } else {
            }
          });

          ///update treasury and treasury actions
          if (req.body.cashed > 0) {
            Treasury.find({ _id: req.body.treasury }, function (err, treasury) {
              if (err) {
                console.log(err);
              } else {
                treasury[0].value = treasury[0].value - req.body.cashed;
                Treasury.findOneAndUpdate(
                  { _id: treasury[0]._id },
                  treasury[0],
                  function (err, edittreasury) {
                    if (err) {
                      console.log(err);
                    } else {
                      var obj = {
                        buyfromsupplier: {
                          status: true,
                          billid: bill._id,
                          treasuryvalue: treasury[0].value,
                          checktreasuryvalue: treasury[0].valuechecks,
                          date: req.body.date,
                        },
                        treasury: treasury[0]._id,
                        user: bill.user,
                        date: req.body.date,
                      };
                      var newTreasuryAction = new TreasuryActions(obj);
                      newTreasuryAction.save(function (err, action) {
                        if (err) {
                          console.log(err);
                        } else {
                        }
                      });
                    }
                  }
                );
              }
            });
          }

          ////update supplier value
          if (req.body.cashed != req.body.totalamount) {
            if (req.body.forclient == true) {
              Clients.find({ _id: req.body.client }, function (err, client) {
                if (err) {
                  return res.json({ code: 21, message: err });
                } else {
                  console.log(client);
                  var remain = req.body.totalamount - req.body.cashed;
                  client[0].debtvalue = client[0].debtvalue - remain;
                  Clients.findOneAndUpdate(
                    { _id: client[0]._id },
                    client[0],
                    function (err, obj) {
                      if (err) {
                        return res.json({ code: 21, message: err });
                      } else {
                      }
                    }
                  );
                }
              });
            } else {
              Suppliers.find(
                { _id: req.body.supplier },
                function (err, supplier) {
                  if (err) {
                    return res.json({ code: 21, message: err });
                  } else {
                    var remain = req.body.totalamount - req.body.cashed;
                    supplier[0].value = supplier[0].value + remain;
                    Suppliers.findOneAndUpdate(
                      { _id: supplier[0]._id },
                      supplier[0],
                      function (err, obj) {
                        if (err) {
                          return res.json({ code: 21, message: err });
                        } else {
                        }
                      }
                    );
                  }
                }
              );
            }
          }
          return res.json({ code: 100, obj: bill });
        }
      });
    }
  });
};

exports.editbuybill = function (req, res) {
  BuyFromSuppliers.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    function (err, bill) {
      if (err) {
        return res.json({ code: 21, message: err });
      } else {
        ///update store
        var stores = [];
        for (const index in req.body.rebackdetails[
          req.body.rebackdetails.length - 1
        ].details) {
          var flag = false;
          for (const index2 in stores) {
            if (
              req.body.rebackdetails[req.body.rebackdetails.length - 1].details[
                index
              ].fromstore == stores[index2]
            ) {
              flag = true;
            }
          }
          if (flag == false) {
            stores.push(
              req.body.rebackdetails[req.body.rebackdetails.length - 1].details[
                index
              ].fromstore
            );
          }
        }
        var fullobj = [];
        var products =
          req.body.rebackdetails[req.body.rebackdetails.length - 1].details;
        for (const index in stores) {
          var obj = { store: stores[index], products: [] };
          for (const index2 in products) {
            if (products[index2].fromstore == stores[index]) {
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
                      rebackfromsupplier: {
                        status: true,
                        billid: bill._id,
                        date:
                          req.body.rebackdetails[
                            req.body.rebackdetails.length - 1
                          ].rebackdate,
                      },
                      user: bill.user,
                      store: store[0]._id,
                      daterecived:
                        req.body.rebackdetails[
                          req.body.rebackdetails.length - 1
                        ].rebackdate,
                        productlist:
                        req.body.rebackdetails[req.body.rebackdetails.length - 1].details
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

        ///update treasury and treasury actions
        if (req.body.rebackdetails[req.body.rebackdetails.length - 1].cash > 0) {
          Treasury.find(
            {
              _id:
                req.body.rebackdetails[req.body.rebackdetails.length - 1]
                  .treasury,
            },
            function (err, treasury) {
              if (err) {
                console.log(err);
              } else {
                treasury[0].value =
                  treasury[0].value +
                  req.body.rebackdetails[req.body.rebackdetails.length - 1]
                    .cash;
                Treasury.findOneAndUpdate(
                  { _id: treasury[0]._id },
                  treasury[0],
                  function (err, edittreasury) {
                    if (err) {
                      console.log(err);
                    } else {
                      var obj = {
                        rebackfromsupplier: {
                          status: true,
                          billid: bill._id,
                          treasuryvalue: treasury[0].value,
                          checktreasuryvalue: treasury[0].valuechecks,
                          date:
                            req.body.rebackdetails[
                              req.body.rebackdetails.length - 1
                            ].rebackdate,
                        },
                        treasury: treasury[0]._id,
                        user: bill.user,
                        date:
                          req.body.rebackdetails[
                            req.body.rebackdetails.length - 1
                          ].rebackdate,
                      };
                      var newTreasuryAction = new TreasuryActions(obj);
                      newTreasuryAction.save(function (err, action) {
                        if (err) {
                          console.log(err);
                        } else {
                        }
                      });
                    }
                  }
                );
              }
            }
          );
        }
        ////update supplier value
        if (
          req.body.rebackdetails[req.body.rebackdetails.length - 1].cash !=
          req.body.rebackdetails[req.body.rebackdetails.length - 1].totalamount
        ) {
          if (req.body.forclient == true) {
            Clients.find({ _id: req.body.client }, function (err, client) {
              if (err) {
                return res.json({ code: 21, message: err });
              } else {
                console.log(client);

                var remain =
                  req.body.rebackdetails[req.body.rebackdetails.length - 1]
                    .totalamount -
                  req.body.rebackdetails[req.body.rebackdetails.length - 1]
                    .cash;
                client[0].debtvalue = client[0].debtvalue + remain;
                Clients.findOneAndUpdate(
                  { _id: client[0]._id },
                  client[0],
                  function (err, obj) {
                    if (err) {
                      return res.json({ code: 21, message: err });
                    } else {
                    }
                  }
                );
              }
            });
          } else {
            Suppliers.find(
              { _id: req.body.supplier },
              function (err, supplier) {
                if (err) {
                  return res.json({ code: 21, message: err });
                } else {
                  var remain =
                    req.body.rebackdetails[req.body.rebackdetails.length - 1]
                      .totalamount -
                    req.body.rebackdetails[req.body.rebackdetails.length - 1]
                      .cash;
                  supplier[0].value = supplier[0].value - remain;
                  Suppliers.findOneAndUpdate(
                    { _id: supplier[0]._id },
                    supplier[0],
                    function (err, obj) {
                      if (err) {
                        return res.json({ code: 21, message: err });
                      } else {
                      }
                    }
                  );
                }
              }
            );
          }
        }

        //// adding client and supplier actions
        if (req.body.forclient == true) {
          var obj = {
            rebackfromsupplier: {
              status: true,
              billid: bill._id,
              date:
                req.body.rebackdetails[req.body.rebackdetails.length - 1]
                  .rebackdate,
            },
            user: bill.user,
            date:
              req.body.rebackdetails[req.body.rebackdetails.length - 1]
                .rebackdate,
            forsupplier: false,
            client: req.body.client,
          };
          var newdoc = new ClientsActions(obj);
          newdoc.save(function (err, action) {
            if (err) {
              console.log(err);
            } else {
            }
          });
        } else {
          var obj = {
            rebackfromsupplier: {
              status: true,
              billid: bill._id,
              date:
                req.body.rebackdetails[req.body.rebackdetails.length - 1]
                  .rebackdate,
            },
            user: bill.user,
            date:
              req.body.rebackdetails[req.body.rebackdetails.length - 1]
                .rebackdate,
            forsupplier: true,
            supplier: req.body.supplier,
          };
          var newdoc = new ClientsActions(obj);
          newdoc.save(function (err, action) {
            if (err) {
              console.log(err);
            } else {
            }
          });
        }
        return res.json({ code: 100, obj: bill });
      }
    }
  );
};

exports.getbuybill = function (req, res) {
  BuyFromSuppliers.find(
    { billno: req.params.billno, user: req.params.user },

    function (err, buybill) {
      if (err) {
        return res.json({ code: 21, message: err });
      } else {
        return res.json({ code: 100, obj: buybill });
      }
    }
  )
    .populate("details.productid")
    .populate("supplier")
    .populate("client");
};

exports.getbuybillswithsupplieranddate = function (req, res) {
  BuyFromSuppliers.find(
    {
      supplier: req.params.supplier,
      user: req.params.user,
      date: { $gte: req.params.from, $lt: req.params.to },
    },

    function (err, buybills) {
      if (err) {
        return res.json({ code: 21, message: err });
      } else {
        return res.json({ code: 100, obj: buybills });
      }
    }
  )
    .populate("details.productid")
    .populate("store")
    .populate("treasury");
};

exports.getrebackbuybillswithsupplieranddate = function (req, res) {
  BuyFromSuppliers.find(
    {
      rebackstatus: true,
      supplier: req.params.supplier,
      user: req.params.user,
      "rebackdetails.rebackdate": { $gte: req.params.from, $lt: req.params.to },
    },
    function (err, buybills) {
      if (err) {
        return res.json({ code: 21, message: err });
      } else {
        return res.json({ code: 100, obj: buybills });
      }
    }
  )
    .populate("details.productid")
    .populate("store")
    .populate("treasury")
    .populate("rebackdetails.details.productid")
    .populate("rebackdetails.details.fromstore");
};
