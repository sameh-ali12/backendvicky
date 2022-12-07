"use strict";
var mongoose = require("mongoose"),
  SellToClients = mongoose.model("selltoclients"),
  Treasury = mongoose.model("treasuries"),
  TreasuryActions = mongoose.model("treasuryactions"),
  Clients = mongoose.model("clients"),
  Store = mongoose.model("stores"),
  StoreActions = mongoose.model("storeactions"),
  Product = mongoose.model("products"),
  Store = mongoose.model("stores"),
  Suppliers = mongoose.model("suppliers"),
  ClientsActions = mongoose.model("clientandsupplieractions"),
  ProductActions = mongoose.model("productactions"),
  Sales = mongoose.model("sales");

exports.addsellbill = function (req, res) {
  SellToClients.countDocuments(function (err, c) {
    if (err) {
      return err;
    } else {
      req.body.billno = c + 1;
      var newselltoclient = new SellToClients(req.body);
      newselltoclient.save(function (err, bill) {
        if (err) {
          //  console.log(err);
          return res.status(400).send({
            message: err,
          });
        } else {
          ///update treasury and treasury actions
          if (req.body.cashed > 0) {
            Treasury.find({ _id: req.body.treasury }, function (err, treasury) {
              if (err) {
                console.log(err);
              } else {
                treasury[0].value = treasury[0].value + req.body.cashed;
                Treasury.findOneAndUpdate(
                  { _id: treasury[0]._id },
                  treasury[0],
                  function (err, edittreasury) {
                    if (err) {
                      console.log(err);
                    } else {
                      var obj = {
                        selltoclients: {
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

          ///adding client and supplier acation
          var obj;
          if (req.body.forsupplier == true) {
            obj = {
              selltoclients: {
                status: true,
                billid: bill._id,
                date: req.body.date,
              },
              user: bill.user,
              date: req.body.date,
              forsupplier: true,
              supplier: req.body.supplier,
            };
            Suppliers.find(
              { _id: req.body.supplier },
              function (err, supplier) {
                if (err) {
                  return res.json({ code: 21, message: err });
                } else {
                  var remain =
                    req.body.totalamount - req.body.cashed - req.body.discount;
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
          } else {
            obj = {
              selltoclients: {
                status: true,
                billid: bill._id,
                date: req.body.date,
              },
              user: bill.user,
              date: req.body.date,
              forsupplier: false,
              client: req.body.client,
            };

            Clients.find({ _id: req.body.client }, function (err, client) {
              if (err) {
                return res.json({ code: 21, message: err });
              } else {
                console.log(client);
                var remain =
                  req.body.totalamount - req.body.cashed - req.body.discount;
                client[0].debtvalue = client[0].debtvalue + remain;
                Clients.findOneAndUpdate(
                  { _id: client[0]._id },
                  client[0],
                  function (err, client) {
                    if (err) {
                      return res.json({ code: 21, message: err });
                    } else {
                    }
                  }
                );
              }
            });
          }

          if (req.body.forsupplier == true) {
            var obj = {
              selltoclients: {
                status: true,
                billid: bill._id,
                date: req.body.date,
              },
              user: bill.user,
              date: req.body.date,
              forsupplier: true,
              supplier: req.body.supplier,
            };
          } else {
            var obj = {
              selltoclients: {
                status: true,
                billid: bill._id,
                date: req.body.date,
              },
              user: bill.user,
              date: req.body.date,
              forsupplier: false,
              client: req.body.client,
            };
          }
          var newdoc = new ClientsActions(obj);
          newdoc.save(function (err, action) {
            if (err) {
              console.log(err);
            } else {
            }
          });

          var obj = {
            sellforclient: {
              status: true,
              billid: bill._id,
              date: req.body.date,
            },
            user: req.body.user,
            productlist: req.body.details,
            daterecived: req.body.date,
          };

          var newProductAction = new ProductActions(obj);
          newProductAction.save(function (err, action) {
            if (err) {
              return res.status(400).send({
                message: err,
              });
            } else {
              Sales.find({ _id: req.body.sales }, function (err, sales) {
                if (err) {
                  return res.json({ code: 21, message: err });
                } else {
                  var details = sales[0].carstore;
                  for (const index1 in req.body.details) {
                    for (const index2 in details) {
                      if (
                        req.body.details[index1].productid ==
                        details[index2].productid
                      ) {
                        if (
                          details[index2].quntity -
                            req.body.details[index1].realquntity ==
                          0
                        ) {
                          details.splice(index2, 1);
                        } else {
                          details[index2].quntity =
                            details[index2].quntity -
                            req.body.details[index1].realquntity;
                        }
                      }
                    }
                  }
                  sales[0].carstore = details;
                  Sales.findOneAndUpdate(
                    { _id: sales[0]._id },
                    sales[0],
                    function (err, obj) {
                      if (err) return err;
                      else {
                        return res.json({ code: 100, obj: bill });
                      }
                    }
                  );
                }
              });
            }
          });
        }
      });
    }
  });
};

exports.addsellbillfromstore = function (req, res) {
  SellToClients.countDocuments(function (err, c) {
    if (err) {
      return err;
    } else {
      req.body.billno = c + 1;
      var newselltoclient = new SellToClients(req.body);
      newselltoclient.save(function (err, bill) {
        if (err) {
          return res.status(400).send({
            message: err,
          });
        } else {
          ///update treasury and treasury actions
          if (req.body.cashed > 0) {
            Treasury.find({ _id: req.body.treasury }, function (err, treasury) {
              if (err) {
                console.log(err);
              } else {
                treasury[0].value = treasury[0].value + req.body.cashed;
                Treasury.findOneAndUpdate(
                  { _id: treasury[0]._id },
                  treasury[0],
                  function (err, edittreasury) {
                    if (err) {
                      console.log(err);
                    } else {
                      var obj = {
                        sellfromstore: {
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
          ////update client value

          if (req.body.forsupplier == true) {
            Suppliers.find(
              { _id: req.body.supplier },
              function (err, supplier) {
                if (err) {
                  return res.json({ code: 21, message: err });
                } else {
                  var remain =
                    req.body.totalamount - req.body.cashed - req.body.discount;
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
          } else {
            ////update client value
            Clients.find({ _id: req.body.client }, function (err, client) {
              if (err) {
                return res.json({ code: 21, message: err });
              } else {
                console.log(client);
                var remain =
                  req.body.totalamount - req.body.cashed - req.body.discount;
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
          }

          //update store and actions
          var stores = [];
          for (const index in req.body.details) {
            var flag = false;
            for (const index2 in stores) {
              console.log(req.body.details[index].store);
              if (req.body.details[index].fromstore == stores[index2]) {
                flag = true;
              }
            }
            if (flag == false) {
              stores.push(req.body.details[index].fromstore);
            }
          }
          var fullobj = [];
          var products = req.body.details;
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
                        sellfromstore: {
                          status: true,
                          billid: bill._id,
                          date: req.body.date,
                        },
                        user: req.body.user,
                        store: store[0]._id,
                        daterecived: req.body.date,
                        productlist: req.body.details
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
          ///adding client and supplier acation
          if (req.body.forsupplier == true) {
            var obj = {
              sellfromstore: {
                status: true,
                billid: bill._id,
                date: req.body.date,
              },
              user: bill.user,
              date: req.body.date,
              forsupplier: true,
              supplier: req.body.supplier,
            };
          } else {
            var obj = {
              sellfromstore: {
                status: true,
                billid: bill._id,
                date: req.body.date,
              },
              user: bill.user,
              date: req.body.date,
              forsupplier: false,
              client: req.body.client,
            };
          }
          var newdoc = new ClientsActions(obj);
          newdoc.save(function (err, action) {
            if (err) {
              console.log(err);
            } else {
              return res.json({ code: 100, obj: bill });
            }
          });
        }
      });
    }
  });
};
exports.editsellbill = function (req, res) {
  SellToClients.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    function (err, bill) {
      if (err) {
        return res.json({ code: 21, message: err });
      } else {
        ////update treasury
        if (
          req.body.rebackdetails[req.body.rebackdetails.length - 1].cash > 0
        ) {
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
                  treasury[0].value -
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
                        rebackselltoclients: {
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

        //update client
        var remain =
          req.body.rebackdetails[req.body.rebackdetails.length - 1]
            .totalamount -
          req.body.rebackdetails[req.body.rebackdetails.length - 1].cash;
        if (remain != 0) {
          if (req.body.forsupplier == true) {
            Suppliers.find(
              { _id: req.body.supplier },
              function (err, supplier) {
                if (err) {
                  return res.json({ code: 21, message: err });
                } else {
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
          } else {
            Clients.find({ _id: req.body.client }, function (err, client) {
              if (err) {
                return res.json({ code: 21, message: err });
              } else {
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
          }
        }

        //// adding client and supplier actions
        if (req.body.forsupplier == true) {
          var obj = {
            rebackselltoclients: {
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
        } else {
          var obj = {
            rebackselltoclients: {
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
        }

              //// adding quantity to store and add store action
              Store.find(
                {_id:req.body.rebackdetails[req.body.rebackdetails.length - 1].tostore},
                function (err, store) {
                  if (err) {
                    return res.json({ code: 21, message: err });
                  } else {
                    for (const index in req.body.rebackdetails[req.body.rebackdetails.length - 1].details) {
                      var flag = false;
                      for (const index2 in store[0].products) {
                        if (store[0].products[index2].productid == req.body.rebackdetails[req.body.rebackdetails.length - 1].details[index].productid) {
                          flag = true;
                          store[0].products[index2].quantity += req.body.rebackdetails[req.body.rebackdetails.length - 1].details[index].realquntity;
                        }
                   
                      }
                      if (flag == false) {
                        store[0].products.push({
                          productid: req.body.rebackdetails[req.body.rebackdetails.length - 1].details[index].productid,
                          quantity:req.body.rebackdetails[req.body.rebackdetails.length - 1].details[index].realquntity
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
                            rebackselltoclients: {
                              status: true,
                              billid: bill._id,
                              date:
                                req.body.rebackdetails[
                                  req.body.rebackdetails.length - 1
                                ].rebackdate,
                            },
                            user: bill.user,
                            store:
                              req.body.rebackdetails[
                                req.body.rebackdetails.length - 1
                              ].tostore,
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
                              return res.json({ code: 100, obj: bill });
                            }
                          });
                        }
                      }
                    );
                  }
                }
              );
      

      }
    }
  );
};
exports.getsellbill = function (req, res) {
  SellToClients.find(
    { billno: req.params.billno, user: req.params.user },
    req.body,
    function (err, bill) {
      if (err) {
        return res.json({ code: 21, message: err });
      } else {
        return res.json({ code: 100, obj: bill });
      }
    }
  )
    .populate("details.productid")
    .populate("client")
    .populate("supplier");
};

// reports

exports.getsellbillswithallclientssanddate = function (req, res) {
  SellToClients.find(
    {
      user: req.params.user,
      date: { $gte: req.params.from, $lt: req.params.to },
    },
    function (err, bills) {
      if (err) {
        return res.json({ code: 21, message: err });
      } else {
        return res.json({ code: 100, obj: bills });
      }
    }
  )
    .populate("details.productid")
    .populate("details.fromstore")
    .populate("sales")
    .populate("client")
    .populate("supplier")
    .populate("treasury")
    .populate("user");
};

exports.getsellbillswithallclientsandallsalesanddate = function (req, res) {
  SellToClients.find(
    {
      directfromstore: false,
      user: req.params.user,
      date: { $gte: req.params.from, $lt: req.params.to },
    },
    function (err, bills) {
      if (err) {
        return res.json({ code: 21, message: err });
      } else {
        return res.json({ code: 100, obj: bills });
      }
    }
  )
    .populate("details.productid")
    .populate("details.fromstore")
    .populate("sales")
    .populate("client")
    .populate("treasury")
    .populate("user")
    .populate("supplier");
};

exports.getsellbillswithallclientsandstoreanddate = function (req, res) {
  SellToClients.find(
    {
      directfromstore: true,
      user: req.params.user,
      date: { $gte: req.params.from, $lt: req.params.to },
    },
    function (err, bills) {
      if (err) {
        return res.json({ code: 21, message: err });
      } else {
        return res.json({ code: 100, obj: bills });
      }
    }
  )
    .populate("details.productid")
    .populate("details.fromstore")
    .populate("sales")
    .populate("client")
    .populate("treasury")
    .populate("user")
    .populate("supplier");
};

exports.getsellbillswithoneclientandonesalesanddate = function (req, res) {
  SellToClients.find(
    {
      directfromstore: false,
      sales: req.params.sales,
      client: req.params.client,
      user: req.params.user,
      date: { $gte: req.params.from, $lt: req.params.to },
    },
    function (err, bills) {
      if (err) {
        return res.json({ code: 21, message: err });
      } else {
        return res.json({ code: 100, obj: bills });
      }
    }
  )
    .populate("details.productid")
    .populate("details.fromstore")
    .populate("sales")
    .populate("client")
    .populate("treasury")
    .populate("user")
    .populate("supplier");
};

exports.getsellbillswithoneclientandallstoreanddate = function (req, res) {
  SellToClients.find(
    {
      directfromstore: true,
      client: req.params.client,
      user: req.params.user,
      date: { $gte: req.params.from, $lt: req.params.to },
    },
    function (err, bills) {
      if (err) {
        return res.json({ code: 21, message: err });
      } else {
        return res.json({ code: 100, obj: bills });
      }
    }
  )
    .populate("details.productid")
    .populate("details.fromstore")
    .populate("sales")
    .populate("client")
    .populate("treasury")
    .populate("user")
    .populate("supplier");
};

/// عميل واحد كل المندوبين
exports.getsellbillswithoneclientandallsalesanddate = function (req, res) {
  SellToClients.find(
    {
      directfromstore: false,
      client: req.params.client,
      user: req.params.user,
      date: { $gte: req.params.from, $lt: req.params.to },
    },
    function (err, bills) {
      if (err) {
        return res.json({ code: 21, message: err });
      } else {
        return res.json({ code: 100, obj: bills });
      }
    }
  )
    .populate("details.productid")
    .populate("details.fromstore")
    .populate("sales")
    .populate("client")
    .populate("treasury")
    .populate("user")
    .populate("supplier");
};

//// عميل واحد والكل
exports.getsellbillswithoneclientandallanddate = function (req, res) {
  SellToClients.find(
    {
      client: req.params.client,
      user: req.params.user,
      date: { $gte: req.params.from, $lt: req.params.to },
    },
    function (err, bills) {
      if (err) {
        return res.json({ code: 21, message: err });
      } else {
        return res.json({ code: 100, obj: bills });
      }
    }
  )
    .populate("details.productid")
    .populate("details.fromstore")
    .populate("sales")
    .populate("client")
    .populate("treasury")
    .populate("user")
    .populate("supplier");
};

///كل العملاء ومندوب واحد
exports.getsellbillswitallclientandonesalesanddate = function (req, res) {
  SellToClients.find(
    {
      directfromstore: false,
      sales: req.params.sales,
      user: req.params.user,
      date: { $gte: req.params.from, $lt: req.params.to },
    },
    function (err, bills) {
      if (err) {
        return res.json({ code: 21, message: err });
      } else {
        return res.json({ code: 100, obj: bills });
      }
    }
  )
    .populate("details.productid")
    .populate("details.fromstore")
    .populate("sales")
    .populate("client")
    .populate("treasury")
    .populate("user")
    .populate("supplier");
};

exports.getrebacksellbillswithclientanddate = function (req, res) {
  SellToClients.find(
    {
      rebackstatus: true,
      client: req.params.client,
      user: req.params.user,
      "rebackdetails.rebackdate": { $gte: req.params.from, $lt: req.params.to },
    },
    function (err, buybills) {
      if (err) {
        console.log(err);
        return res.json({ code: 21, message: err });
      } else {
        return res.json({ code: 100, obj: buybills });
      }
    }
  )
    .populate("details.productid")
    .populate("details.fromstore")
    .populate("sales")
    .populate("client")
    .populate("treasury")
    .populate("user")
    .populate("rebackdetails.details.productid")
    .populate("rebackdetails.tostore")
    .populate("rebackdetails.treasury")
    .populate("supplier");
};
