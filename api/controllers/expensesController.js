"use strict";
var mongoose = require("mongoose"),
  Expenses = mongoose.model("expenses"),
  Treasury = mongoose.model("treasuries"),
TreasuryActions = mongoose.model("treasuryactions");
exports.addexpenses = function (req, res) {
  var newExpenses = new Expenses(req.body);
  newExpenses.save(function (err,expenses) {
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
                    expenses: {
                      status: true,
                      expensesid: expenses._id,
                      treasuryvalue: treasury[0].value,
                      checktreasuryvalue: treasury[0].valuechecks,
                      date:req.body.date
                    },
                    treasury: treasury[0]._id,
                    user: expenses.user,
                    date:req.body.date

                  };
                  var newTreasuryAction = new TreasuryActions(obj);
                  newTreasuryAction.save(function (err, action) {
                    if (err) {
                      console.log(err);
                    } else {
                      return res.json({ code: 100, obj: expenses });
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
exports.allexpenses = function (req, res) {
  Expenses.find({ user: req.params.userid }, function (err, expenses) {
    if (err) {
      return res.json({ code: 21, message: err });
    } else {
      return res.json({ code: 100, obj: expenses });
    }
  }).populate('cat')
  .populate('fromtreasury');
};
exports.deleteexpenses = function (req, res) {
  Expenses.findOneAndRemove({ _id: req.params.id }, function (err, expenses) {
    if (err) {
      return res.json({ code: 21, message: err });
    } else {
      return res.json({ code: 100, obj: expenses });
    }
  });
};
/////reports
exports.expenseswithcatanddate = function (req, res) {
  Expenses.find({ user: req.params.user,cat:req.params.cat,"date": {"$gte": req.params.fromdate, "$lt": req.params.todate}}, function (err, expenses) {
    if (err) {
      return res.json({ code: 21, message: err });
    } else {
      return res.json({ code: 100, obj: expenses });
    }
  }).populate('cat')
  .populate('fromtreasury');
};