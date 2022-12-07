"use strict";
var mongoose = require("mongoose"),
PaymentToSuppliers = mongoose.model("paymenttosuppliers"),
Suppliers = mongoose.model("suppliers"),
Treasury = mongoose.model("treasuries"),
TreasuryActions = mongoose.model("treasuryactions"),
ClientsActions = mongoose.model("clientandsupplieractions");

  
exports.addpaymenttosuppliers = function (req, res) {
  var newPayment = new PaymentToSuppliers(req.body);
  newPayment.save(function (err,payments) {
    if (err) {
      return res.status(400).send({
        message: err,
      });
    } else {

      Treasury.find(
        {
          _id: req.body.fromtreasury,
        },
        function (err, treasury) {
          if (err) {
            console.log(err);
          } else {
            treasury[0].value = treasury[0].value - req.body.value;
            Treasury.findOneAndUpdate(
              { _id: treasury[0]._id },
              treasury[0],
              function (err, edittreasury) {
                if (err) {
                  console.log(err);
                } else {

                  var obj = {
                    paymenttosuppliers: {
                      status: true,
                      paymenttosupplierid: payments._id,
                      date: req.body.daterecived,
                    },
                    user: payments.user,
                    date: req.body.daterecived,
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

                  
                  var obj = {
                    paymenttosuppliers: {
                      status: true,
                      paymenttosupplierid: payments._id,
                      treasuryvalue: treasury[0].value,
                      checktreasuryvalue: treasury[0].valuechecks,
                      date:req.body.daterecived
                    },
                    treasury: treasury[0]._id,
                    user: payments.user,
                    date:req.body.daterecived
                  };
                  var newTreasuryAction = new TreasuryActions(obj);
                  newTreasuryAction.save(function (err, action) {
                    if (err) {
                      console.log(err);
                    } else {
                      Suppliers.find({ _id: req.body.supplier }, function (
                        err,
                        supplier
                      ) {
                        if (err) {
                          return res.json({ code: 21, message: err });
                        } else {
                          
                          supplier[0].value =
                          supplier[0].value - req.body.value;

                          Suppliers.findOneAndUpdate({ _id: supplier[0]._id },supplier[0], function (err, editcsupplier) {
                              if (err) {
                               console.log(err)
                              } else {
                              }
                            });
                        }
                      });

                    }
                  });
                  return res.json({ code: 100, obj: payments });
                }
              }
            );
          }
        }
      );
       
    
    }
  });
};


exports.paymenttosuppliersanddate = function (req, res) {
  PaymentToSuppliers.find({supplier:req.params.supplier,"daterecived": {"$gte": req.params.from, "$lt": req.params.to}}, function (err,payments) {
    if (err) {
      return res.json({ code: 21, message: err });
    } else {
      return res.json({ code: 100, obj: payments });
    }
  }).populate('fromtreasury');
};