"use strict";
var mongoose = require("mongoose"),
  PaymentFromClients = mongoose.model("PaymentFromClients"),
  Treasury = mongoose.model("treasuries"),
  TreasuryActions = mongoose.model("treasuryactions"),
  Discounts = mongoose.model("discounttoclients"),
  Clients = mongoose.model("clients"),
  ClientsActions = mongoose.model("clientandsupplieractions");


exports.addpaymentfromclients = function (req, res) {
  var newPayment = new PaymentFromClients(req.body);
  newPayment.save(function (err, payments) {
    if (err) {
      return res.status(400).send({
        message: err,
      });
    } else {
      Treasury.find(
        {
          _id: req.body.totreasury,
        },
        function (err, treasury) {
          if (err) {
            console.log(err);
          } else {
            treasury[0].value = treasury[0].value + req.body.value;
            Treasury.findOneAndUpdate(
              { _id: treasury[0]._id },
              treasury[0],
              function (err, edittreasury) {
                if (err) {
                  console.log(err);
                } else {
                  var obj = {
                    paymentfromclients: {
                      status: true,
                      paymentid: payments._id,
                      treasuryvalue: treasury[0].value,
                      checktreasuryvalue: treasury[0].valuechecks,
                      date: req.body.daterecived,
                    },
                    treasury: treasury[0]._id,
                    user: payments.user,
                    date: req.body.daterecived,
                  };
                  var newTreasuryAction = new TreasuryActions(obj);
                  newTreasuryAction.save(function (err, action) {
                    if (err) {
                      console.log(err);
                    } else {
                      Clients.find(
                        { _id: req.body.client },
                        function (err, client) {
                          if (err) {
                            return res.json({ code: 21, message: err });
                          } else {
                            console.log();

                            client[0].debtvalue =
                              client[0].debtvalue - req.body.value;

                            Clients.findOneAndUpdate(
                              { _id: client[0]._id },
                              client[0],
                              function (err, editclient) {
                                if (err) {
                                  return res.json({ code: 21, message: err });
                                } else {
                                  Clients.find({},function (err, clients) {
                                    if (err) {
                                      return res.json({ code: 21, message: err });
                                    } else {
                                      return res.json({ code: 100, obj: clients });
                                    }
                                  });
                                }
                              }
                            );
                          }
                        }
                      );
                    }
                  });
                  ///// adding payment from clients
                  var obj = {
                    paymentfromclients: {
                      status: true,
                      paymentid: payments._id,
                      date: req.body.daterecived,
                    },
                    user: payments.user,
                    date: req.body.daterecived,
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
              }
            );
          }
        }
      );
   
    }
  });
};

exports.adddiscounttoclients = function (req, res) {
  var discount = new Discounts(req.body);
  discount.save(function (err, discount) {
    if (err) {
      return res.status(400).send({
        message: err,
      });
    } else {
      Clients.find({ _id: req.body.client }, function (err, client) {
        if (err) {
          return res.json({ code: 21, message: err });
        } else {
          client[0].debtvalue = client[0].debtvalue - req.body.value;
          Clients.findOneAndUpdate(
            { _id: client[0]._id },
            client[0],
            function (err, editclient) {
              if (err) {
                return res.json({ code: 21, message: err });
              } else {

                var obj = {
                  discountforclients: {
                    status: true,
                    discountid: discount._id,
                    date: req.body.daterecived,
                  },
                  user: req.body.user,
                  date: req.body.daterecived,
                  forsupplier: false,
                  client: req.body.client
                };
                var newdoc = new ClientsActions(obj);
                newdoc.save(function (err, action) {
                  if (err) {
                    console.log(err);
                  } else {
                    return res.json({ code: 100, obj: discount });
                  }
                });

              }
            }
          );
        }
      });
    }
  });
};

exports.paymentwithclientanddate = function (req, res) {
  PaymentFromClients.find(
    {
      client: req.params.client,
      daterecived: { $gte: req.params.from, $lt: req.params.to },
    },
    function (err, payments) {
      if (err) {
        return res.json({ code: 21, message: err });
      } else {
        return res.json({ code: 100, obj: payments });
      }
    }
  ).populate("totreasury");
};

exports.discountswithclientanddate = function (req, res) {
  Discounts.find(
    {
      client: req.params.client,
      daterecived: { $gte: req.params.from, $lt: req.params.to },
    },
    function (err, payments) {
      if (err) {
        return res.json({ code: 21, message: err });
      } else {
        return res.json({ code: 100, obj: payments });
      }
    }
  );
};
