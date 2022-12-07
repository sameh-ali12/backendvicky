"use strict";
var mongoose = require("mongoose"),
  PartnerSell = mongoose.model("partnersells"),
  User = mongoose.model("User"),
  Store = mongoose.model("stores"),
  StoreActions = mongoose.model("storeactions"),
  Treasury = mongoose.model("treasuries"),
  TreasuryActions = mongoose.model("treasuryactions"),
  User = mongoose.model("User"),
  ProductActions = mongoose.model("productactions");

exports.addpartnersell = function (req, res) {
  var patnerSell = new PartnerSell(req.body);
  patnerSell.save(function (err, partnersell) {
    if (err) {
      return res.status(400).send({
        message: err,
      });
    } else {
      return res.json({ code: 100, obj: partnersell });
    }
  });
};

///// this when select it from notifaction
exports.partnersellbyid = function (req, res) {
  PartnerSell.findById({ _id: req.params.id }, function (err, patnersell) {
    if (err) {
      return res.json({ code: 21, message: err });
    } else {
      return res.json({ code: 100, obj: patnersell });
    }
  })
    .populate("to")
    .populate("from")
    .populate("fromtreasury")
    .populate("totreasury")
    .populate("details.productid")
    .populate("details.fromstore")
    .populate("details.tostore");
};

// this when go direct with sidenav
exports.partnersellforstatus = function (req, res) {
  PartnerSell.find(
    { to: req.params.to, status: req.params.status },
    function (err, patnersell) {
      if (err) {
        return res.json({ code: 21, message: err });
      } else {
        return res.json({ code: 100, obj: patnersell });
      }
    }
  )
    .populate("to")
    .populate("from")
    .populate("fromtreasury")
    .populate("totreasury")
    .populate("details.productid")
    .populate("details.fromstore")
    .populate("details.tostore");
};

exports.editpartnersell = function (req, res) {
  PartnerSell.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    function (err, partnersell) {
      if (err) {
        return res.json({ code: 21, message: err });
      } else {
        if (req.body.status == "accept") {
          var valid = true;
          //////update stores for buy partner
          var stores = [];
          for (const index in req.body.details) {
            var flag = false;
            for (const index2 in stores) {
              if (req.body.details[index].fromstore._id == stores[index2]) {
                flag = true;
              }
            }
            if (flag == false) {
              stores.push(req.body.details[index].fromstore._id);
            }
          }
          var fullobj = [];
          var products = req.body.details;
          for (const index in stores) {
            var obj = { store: stores[index], products: [] };
            for (const index2 in products) {
              if (products[index2].fromstore._id == stores[index]) {
                obj.products.push({
                  productid: products[index2].productid._id,
                  quntity: products[index2].quntity,
                });
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
                  for (const index2 in store[0].products) {
                    if (
                      store[0].products[index2].productid ==
                      fullobj[index].products[index1].productid
                    ) {
                      store[0].products[index2].quantity =
                        store[0].products[index2].quantity -
                        fullobj[index].products[index1].quntity;
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
                        buyinside: {
                          status: true,
                          billid: partnersell._id,
                          date: req.body.dateaction,
                        },
                        user: partnersell.from,
                        store: store[0]._id,
                        productlist: req.body.details,
                        daterecived: req.body.dateaction,
                      };
                      var newStoreAction = new StoreActions(obj);
                      newStoreAction.save(function (err, action) {
                        if (err) {
                          return res.status(400).send({ message: err });
                        } else {
                        }
                      });
                    }
                  }
                );
              }
            });
          }

          // var obj = {
          //   buyinside: {
          //     status: true,
          //     billid: partnersell._id,
          //     date:req.body.dateaction
          //   },
          //   user: partnersell.from,
          //   productlist: req.body.details,
          //   daterecived: req.body.dateaction
          // };
          // var newProductAction = new ProductActions(obj);
          // newProductAction.save(function (err, action) {
          //   if (err) {
          //     return res.status(400).send({ message: err });
          //   } else {
          //   }
          // });

          //////update stores for sell partner

          Store.find({ _id: req.body.tostore }, function (err, store) {
            if (err) {
              return res.json({ code: 21, message: err });
            } else {
              for (const index1 in req.body.details) {
                var flag = false;
                for (const index2 in store[0].products) {
                  if (
                    store[0].products[index2].productid ==
                    req.body.details[index1].productid._id
                  ) {
                    flag = true;
                    store[0].products[index2].quantity =
                      store[0].products[index2].quantity +
                      req.body.details[index1].quntity;
                  }
                }
                if (flag == false) {
                  store[0].products.push({
                    productid: req.body.details[index1].productid,
                    quantity: req.body.details[index1].quntity,
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
                      sellinside: {
                        status: true,
                        billid: partnersell._id,
                        date: req.body.dateaction,
                      },
                      user: partnersell.to,
                      store: store[0]._id,
                      productlist: req.body.details,
                      daterecived: req.body.dateaction,
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

          // var obj = {
          //   buyinside: {
          //     status: true,
          //     billid: partnersell._id,
          //     date:req.body.dateaction
          //   },
          //   user: partnersell.to,
          //   productlist: req.body.details,
          //   daterecived: req.body.dateaction
          // };
          // var newProductAction = new ProductActions(obj);
          // newProductAction.save(function (err, action) {
          //   if (err) {
          //     return res.status(400).send({ message: err });
          //   } else {
          //   }
          // });

          ////update treasury
          if (req.body.cashed != 0) {
            // update treasury  for buy partner
            Treasury.find(
              {
                _id: req.body.totreasury,
              },
              function (err, treasuryto) {
                if (err) {
                  console.log(err);
                } else {
                  treasuryto[0].value = treasuryto[0].value + req.body.cashed;
                  Treasury.findOneAndUpdate(
                    { _id: treasuryto[0]._id },
                    treasuryto[0],
                    function (err, edittreasury) {
                      if (err) {
                        console.log(err);
                      } else {
                        // var obj = {
                        //   sellinside: {
                        //     status: true,
                        //     billid: partnersell._id,
                        //     treasuryvalue: treasuryto[0].value,
                        //     checktreasuryvalue: treasuryto[0].valuechecks,
                        //     date:req.body.dateaction
                        //   },
                        //   treasury: treasuryto[0]._id,
                        //   user: partnersell.from,
                        //   date:req.body.dateaction

                        // };
                        var obj = {
                          buyinside: {
                            status: true,
                            billid: partnersell._id,
                            treasuryvalue: treasuryto[0].value,
                            checktreasuryvalue: treasuryto[0].valuechecks,
                            date: req.body.dateaction,
                          },
                          treasury: treasuryto[0]._id,
                          user: partnersell.from,
                          date: req.body.dateaction,
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

            Treasury.find(
              {
                _id: req.body.fromtreasury,
              },
              function (err, treasury) {
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
                        // var obj = {
                        //   buyinside: {
                        //     status: true,
                        //     billid: partnersell._id,
                        //     treasuryvalue: treasury[0].value,
                        //     checktreasuryvalue: treasury[0].valuechecks,
                        //     date:req.body.dateaction

                        //   },
                        //   treasury: treasury[0]._id,
                        //   user: partnersell.to,
                        //   date:req.body.dateaction

                        // };

                        var obj = {
                          sellinside: {
                            status: true,
                            billid: partnersell._id,
                            treasuryvalue: treasury[0].value,
                            checktreasuryvalue: treasury[0].valuechecks,
                            date: req.body.dateaction,
                          },
                          treasury: treasury[0]._id,
                          user: partnersell.to,
                          date: req.body.dateaction,
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

          /////updateusers
          User.find(
            {
              _id: req.body.to,
            },
            function (err, user) {
              if (err) {
                console.log(err);
              } else {
                var remain = req.body.total - req.body.cashed;
                for (const index in user[0].partners) {
                  if (user[0].partners[index].user == req.body.from._id) {
                    user[0].partners[index].buybills.push(partnersell._id);
                    user[0].partners[index].value =
                      user[0].partners[index].value - remain;
                  }
                }
                User.findOneAndUpdate(
                  { _id: req.body.to },
                  user[0],
                  function (err, user) {
                    if (err) {
                      console.log(err);
                    } else {
                    }
                  }
                );
              }
            }
          );

          User.find(
            {
              _id: req.body.from._id,
            },
            function (err, user) {
              if (err) {
                console.log(err);
              } else {
                var remain = req.body.total - req.body.cashed;
                for (const index in user[0].partners) {
                  if (user[0].partners[index].user == req.body.to._id) {
                    user[0].partners[index].sellbills.push(partnersell._id);
                    user[0].partners[index].value =
                      user[0].partners[index].value + remain;
                  }
                }
                User.findOneAndUpdate(
                  { _id: req.body.from._id },
                  user[0],
                  function (err, user) {
                    if (err) {
                      console.log(err);
                    } else {
                    }
                  }
                );
              }
            }
          );
        }
        return res.json({ code: 100, obj: partnersell });
      }
    }
  );
};

exports.editparntersellprice = function (req, res) {
  PartnerSell.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    function (err, partnersell) {
      if (err) {
        return res.json({ code: 21, message: err });
      } else {
        /////updateusers
        User.find(
          {
            _id: req.body.to,
          },
          function (err, user) {
            if (err) {
              console.log(err);
            } else {
              for (const index in user[0].partners) {
                if (user[0].partners[index].user == req.body.from._id) {
                  user[0].partners[index].value =
                    user[0].partners[index].value + req.body.remain;
                }
              }
              User.findOneAndUpdate(
                { _id: req.body.to },
                user[0],
                function (err, user) {
                  if (err) {
                    console.log(err);
                  } else {
                  }
                }
              );
            }
          }
        );

        User.find(
          {
            _id: req.body.from._id,
          },
          function (err, user) {
            if (err) {
              console.log(err);
            } else {
              var remain = req.body.total - req.body.cashed;
              for (const index in user[0].partners) {
                if (user[0].partners[index].user == req.body.to._id) {
                  user[0].partners[index].value =
                    user[0].partners[index].value - req.body.remain;
                }
              }
              User.findOneAndUpdate(
                { _id: req.body.from._id },
                user[0],
                function (err, user) {
                  if (err) {
                    console.log(err);
                  } else {
                  }
                }
              );
            }
          }
        );

        return res.json({ code: 100, data: partnersell });
      }
    }
  );
};

exports.checkacceptpartnersell = function (req, res) {
  if (req.body.cashed != 0) {
    Treasury.find(
      {
        _id: req.body.fromtreasury,
      },
      function (err, treasury) {
        if (err) {
          console.log(err);
        } else {
          var i = treasury[0].value - req.body.cashed;
          if (i < 0) {
            return res.json({ code: 20 });
          } else {
            return res.json({ code: 100 });
          }
        }
      }
    );
  } else {
    return res.json({ code: 100 });
  }
};

////////reports area
// sell
exports.getallpartnersell = function (req, res) {
  PartnerSell.find({ from: req.params.from }, function (err, patnersell) {
    if (err) {
      return res.json({ code: 21, message: err });
    } else {
      return res.json({ code: 100, obj: patnersell });
    }
  })
    .populate("to")
    .populate("from")
    .populate("fromtreasury")
    .populate("totreasury")
    .populate("details.productid")
    .populate("details.fromstore")
    .populate("details.tostore");
};

exports.getpartnersellwithstatus = function (req, res) {
  PartnerSell.find(
    { from: req.params.from, status: req.params.status },
    function (err, patnersell) {
      if (err) {
        return res.json({ code: 21, message: err });
      } else {
        return res.json({ code: 100, obj: patnersell });
      }
    }
  )
    .populate("to")
    .populate("from")
    .populate("fromtreasury")
    .populate("totreasury")
    .populate("details.productid")
    .populate("details.fromstore")
    .populate("details.tostore");
};

exports.getpartnersellwithstatusanddate = function (req, res) {
  PartnerSell.find(
    {
      from: req.params.from,
      status: req.params.status,
      daterecived: { $gte: req.params.fromdate, $lt: req.params.todate },
    },
    function (err, patnersell) {
      if (err) {
        return res.json({ code: 21, message: err });
      } else {
        return res.json({ code: 100, obj: patnersell });
      }
    }
  )
    .populate("to")
    .populate("from")
    .populate("fromtreasury")
    .populate("totreasury")
    .populate("details.productid")
    .populate("details.fromstore")
    .populate("details.tostore");
};

exports.getpartnersellwithdate = function (req, res) {
  PartnerSell.find(
    {
      from: req.params.from,
      daterecived: { $gte: req.params.fromdate, $lt: req.params.todate },
    },
    function (err, patnersell) {
      if (err) {
        return res.json({ code: 21, message: err });
      } else {
        return res.json({ code: 100, obj: patnersell });
      }
    }
  )
    .populate("to")
    .populate("from")
    .populate("fromtreasury")
    .populate("totreasury")
    .populate("details.productid")
    .populate("details.fromstore")
    .populate("details.tostore");
};

exports.getpartnersellwithdateandstatusandpartner = function (req, res) {
  PartnerSell.find(
    {
      from: req.params.from,
      to: req.params.to,
      status: req.params.status,
      daterecived: { $gte: req.params.fromdate, $lt: req.params.todate },
    },
    function (err, patnersell) {
      if (err) {
        return res.json({ code: 21, message: err });
      } else {
        return res.json({ code: 100, obj: patnersell });
      }
    }
  )
    .populate("to")
    .populate("from")
    .populate("fromtreasury")
    .populate("totreasury")
    .populate("details.productid")
    .populate("details.fromstore")
    .populate("details.tostore");
};

exports.getpartnersellwithandstatusandpartner = function (req, res) {
  PartnerSell.find(
    { from: req.params.from, to: req.params.to, status: req.params.status },
    function (err, patnersell) {
      if (err) {
        return res.json({ code: 21, message: err });
      } else {
        return res.json({ code: 100, obj: patnersell });
      }
    }
  )
    .populate("to")
    .populate("from")
    .populate("fromtreasury")
    .populate("totreasury")
    .populate("details.productid")
    .populate("details.fromstore")
    .populate("details.tostore");
};

exports.getpartnersellwithdateandpartner = function (req, res) {
  PartnerSell.find(
    {
      from: req.params.from,
      to: req.params.to,
      daterecived: { $gte: req.params.fromdate, $lt: req.params.todate },
    },
    function (err, patnersell) {
      if (err) {
        return res.json({ code: 21, message: err });
      } else {
        return res.json({ code: 100, obj: patnersell });
      }
    }
  )
    .populate("to")
    .populate("from")
    .populate("fromtreasury")
    .populate("totreasury")
    .populate("details.productid")
    .populate("details.fromstore")
    .populate("details.tostore");
};

exports.getpartnersellwithpartner = function (req, res) {
  PartnerSell.find(
    { from: req.params.from, to: req.params.to },
    function (err, patnersell) {
      if (err) {
        return res.json({ code: 21, message: err });
      } else {
        return res.json({ code: 100, obj: patnersell });
      }
    }
  )
    .populate("to")
    .populate("from")
    .populate("fromtreasury")
    .populate("totreasury")
    .populate("details.productid")
    .populate("details.fromstore")
    .populate("details.tostore");
};

// buy

exports.getallpartnerbuy = function (req, res) {
  PartnerSell.find({ to: req.params.to }, function (err, patnersell) {
    if (err) {
      return res.json({ code: 21, message: err });
    } else {
      return res.json({ code: 100, obj: patnersell });
    }
  })
    .populate("to")
    .populate("from")
    .populate("fromtreasury")
    .populate("totreasury")
    .populate("details.productid")
    .populate("details.fromstore")
    .populate("tostore");
};

exports.getpartnerbuywithstatus = function (req, res) {
  PartnerSell.find(
    { to: req.params.to, status: req.params.status },
    function (err, patnersell) {
      if (err) {
        return res.json({ code: 21, message: err });
      } else {
        return res.json({ code: 100, obj: patnersell });
      }
    }
  )
    .populate("to")
    .populate("from")
    .populate("fromtreasury")
    .populate("totreasury")
    .populate("details.productid")
    .populate("details.fromstore")
    .populate("tostore");
};

exports.getpartnerbuywithstatusanddate = function (req, res) {
  PartnerSell.find(
    {
      to: req.params.to,
      status: req.params.status,
      daterecived: { $gte: req.params.fromdate, $lt: req.params.todate },
    },
    function (err, patnersell) {
      if (err) {
        return res.json({ code: 21, message: err });
      } else {
        return res.json({ code: 100, obj: patnersell });
      }
    }
  )
    .populate("to")
    .populate("from")
    .populate("fromtreasury")
    .populate("totreasury")
    .populate("details.productid")
    .populate("details.fromstore")
    .populate("tostore");
};

exports.getpartnerbuywithdate = function (req, res) {
  PartnerSell.find(
    {
      to: req.params.to,
      daterecived: { $gte: req.params.fromdate, $lt: req.params.todate },
    },
    function (err, patnersell) {
      if (err) {
        return res.json({ code: 21, message: err });
      } else {
        return res.json({ code: 100, obj: patnersell });
      }
    }
  )
    .populate("to")
    .populate("from")
    .populate("fromtreasury")
    .populate("totreasury")
    .populate("details.productid")
    .populate("details.fromstore")
    .populate("tostore");
};

exports.getpartnerbuywithdateandstatusandpartner = function (req, res) {
  PartnerSell.find(
    {
      to: req.params.to,
      from: req.params.from,
      status: req.params.status,
      daterecived: { $gte: req.params.fromdate, $lt: req.params.todate },
    },
    function (err, patnersell) {
      if (err) {
        return res.json({ code: 21, message: err });
      } else {
        return res.json({ code: 100, obj: patnersell });
      }
    }
  )
    .populate("to")
    .populate("from")
    .populate("fromtreasury")
    .populate("totreasury")
    .populate("details.productid")
    .populate("details.fromstore")
    .populate("tostore");
};

exports.getpartnerbuywithandstatusandpartner = function (req, res) {
  PartnerSell.find(
    { to: req.params.to, from: req.params.from, status: req.params.status },
    function (err, patnersell) {
      if (err) {
        return res.json({ code: 21, message: err });
      } else {
        return res.json({ code: 100, obj: patnersell });
      }
    }
  )
    .populate("to")
    .populate("from")
    .populate("fromtreasury")
    .populate("totreasury")
    .populate("details.productid")
    .populate("details.fromstore")
    .populate("tostore");
};

exports.getpartnerbuywithdateandpartner = function (req, res) {
  PartnerSell.find(
    {
      to: req.params.to,
      from: req.params.from,
      daterecived: { $gte: req.params.fromdate, $lt: req.params.todate },
    },
    function (err, patnersell) {
      if (err) {
        return res.json({ code: 21, message: err });
      } else {
        return res.json({ code: 100, obj: patnersell });
      }
    }
  )
    .populate("to")
    .populate("from")
    .populate("fromtreasury")
    .populate("totreasury")
    .populate("details.productid")
    .populate("details.fromstore")
    .populate("tostore");
};

exports.getpartnerbuywithpartner = function (req, res) {
  PartnerSell.find(
    { to: req.params.to, from: req.params.from },
    function (err, patnersell) {
      if (err) {
        return res.json({ code: 21, message: err });
      } else {
        return res.json({ code: 100, obj: patnersell });
      }
    }
  )
    .populate("to")
    .populate("from")
    .populate("fromtreasury")
    .populate("totreasury")
    .populate("details.productid")
    .populate("details.fromstore")
    .populate("tostore");
};
