"use strict";
var mongoose = require("mongoose"),
  TransferMoney = mongoose.model("transfers"),
  Treasury = mongoose.model("treasuries"),
  TreasuryActions = mongoose.model("treasuryactions"),
  User = mongoose.model("User");

exports.addtransfer = function (req, res) {
  var transfer = new TransferMoney(req.body);
  transfer.save(function (err, transfer) {
    if (err) {
      return res.status(400).send({
        message: err
      });
    } else {
      return res.json({ code: 100, obj: transfer });
    }
  });
};

///// this when select it from notifaction 
exports.transfermoneybyid = function (req, res) {
  TransferMoney.findById({ _id: req.params.id }, function (err, transfer) {
    if (err) {
      return res.json({ code: 21, message: err });
    } else {
      return res.json({ code: 100, obj: transfer });
    }
  }).populate("to")
  .populate("from")
  .populate("fromtreasury")
  .populate("totreasury");

};

// this when go direct with sidenav
exports.trnasfermoneyforstatus = function (req, res) {
  TransferMoney.find({to:req.params.to,status:req.params.status}, function (err, transfer) {
    if (err) {
      return res.json({ code: 21, message: err });
    } else {
      return res.json({ code: 100, obj: transfer });
    }
  }).populate("to")
  .populate("from")
  .populate("fromtreasury")
  .populate("totreasury");

};


exports.edittransfermoney = function (req, res) {
  TransferMoney.findOneAndUpdate({ _id: req.params.id },req.body,function (err,transfer) {
    if (err) {
      return res.json({ code: 21, message: err });
    } else {


 // update treasury  for buy partner
 Treasury.find(
  {
    _id: req.body.totreasury,
    
  },
  function (err, treasuryto) {
    if (err) {
      console.log(err);
    } else {
      treasuryto[0].value = treasuryto[0].value + req.body.value;
      Treasury.findOneAndUpdate(
        { _id: treasuryto[0]._id },
        treasuryto[0],
        function (err, edittreasury) {
          if (err) {
            console.log(err);
          } else {
            var obj = {
              partnertransfermoney: {
                status: true,
                transferid: transfer._id,
                treasuryvalue: treasuryto[0].value,
                checktreasuryvalue: treasuryto[0].valuechecks,
                date:req.body.daterecived
              },
              treasury: treasuryto[0]._id,
              user: transfer.to,
              date:req.body.daterecived
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
    _id: req.body.fromtreasury._id,
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
              partnertransfermoney: {
                status: true,
                transferid: transfer._id,
                treasuryvalue: treasury[0].value,
                checktreasuryvalue: treasury[0].valuechecks,
                date:req.body.daterecived

              },
              treasury: treasury[0]._id,
              user: transfer.from,
              date:req.body.daterecived

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


     /////updateusers
     User.find({ _id: req.body.to._id},function (err, user) {
        if (err) {
          console.log(err);
        } else {
     

          console.log('selected user ///'+user);
          for (const index in user[0].partners) {
            if (user[0].partners[index].user == req.body.from._id) {
              user[0].partners[index].transferfromhim.push(transfer._id);
              user[0].partners[index].value = user[0].partners[index].value - req.body.value;
            }
          }
              User.findOneAndUpdate(
                { _id: req.body.to._id},
                user[0],
                function (err,user) {
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
        _id: req.body.from._id
      },
      function (err, user) {
      
        if (err) {
          console.log(err);
        } else {
          for (const index in user[0].partners) {
            if (user[0].partners[index].user == req.body.to._id) {
              user[0].partners[index].transferfromus.push(transfer._id);
              user[0].partners[index].value = user[0].partners[index].value + req.body.value;
            }
          }
              User.findOneAndUpdate(
                { _id: req.body.from._id},
                user[0],
                function (err,user) {
                  if (err) {
                    console.log(err);
                  } else {
                  }
                }
              );
        }
      }
    );
 
    return res.json({ code: 100, obj: transfer });


}
  });
};



//////reports

////////reports area
// from you
exports.getalltransferfromyou = function (req, res) {
  TransferMoney.find({ from: req.params.from }, function (
    err,
    transfer
  ) {
    if (err) {
      return res.json({ code: 21, message: err });
    } else {
      return res.json({ code: 100, obj: transfer });
    }
  })
    .populate("to")
    .populate("from")
    .populate("fromtreasury")
    .populate("totreasury")
};

exports.gettransferfromyouwithstatus = function (req, res) {
  TransferMoney.find({ from: req.params.from , status: req.params.status }, function (
    err,
    transfer
  ) {
    if (err) {
      return res.json({ code: 21, message: err });
    } else {
      return res.json({ code: 100, obj: transfer });
    }
  })
    .populate("to")
    .populate("from")
    .populate("fromtreasury")
    .populate("totreasury")
};

exports.gettransferfromyouwithstatusanddate = function (req, res) {
  TransferMoney.find({ from: req.params.from , status: req.params.status,"daterecived": {"$gte": req.params.fromdate, "$lt": req.params.todate}}, function (
    err,
    transfer
  ) {
    if (err) {
      return res.json({ code: 21, message: err });
    } else {
      return res.json({ code: 100, obj: transfer });
    }
  })
    .populate("to")
    .populate("from")
    .populate("fromtreasury")
    .populate("totreasury")
};


exports.gettransferfromyouwithdate = function (req, res) {
  TransferMoney.find({ from: req.params.from ,"daterecived": {"$gte": req.params.fromdate, "$lt": req.params.todate}}, function (
    err,
    transfer
  ) {
    if (err) {
      return res.json({ code: 21, message: err });
    } else {
      return res.json({ code: 100, obj: transfer });
    }
  })
    .populate("to")
    .populate("from")
    .populate("fromtreasury")
    .populate("totreasury")
};

exports.gettransferfromyouwithdateandstatusandpartner = function (req, res) {
  TransferMoney.find({ from: req.params.from, to: req.params.to,status: req.params.status ,"daterecived": {"$gte": req.params.fromdate, "$lt": req.params.todate}}, function (
    err,
    transfer
  ) {
    if (err) {
      return res.json({ code: 21, message: err });
    } else {
      return res.json({ code: 100, obj: transfer });
    }
  })
    .populate("to")
    .populate("from")
    .populate("fromtreasury")
    .populate("totreasury")

};

exports.gettransferfromyouwithandstatusandpartner = function (req, res) {
  TransferMoney.find({ from: req.params.from, to: req.params.to,status: req.params.status}, function (
    err,
    patnersell
  ) {
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
};

exports.gettransferfromyouwithdateandpartner = function (req, res) {
  TransferMoney.find({ from: req.params.from,to: req.params.to,"daterecived": {"$gte": req.params.fromdate, "$lt": req.params.todate}}, function (
    err,
    patnersell
  ) {
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

};

exports.gettransferfromyouwithpartner = function (req, res) {
  TransferMoney.find({ from: req.params.from,to: req.params.to}, function (
    err,
    patnersell
  ) {
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

};

//to you
exports.getalltransfertoyou = function (req, res) {
  TransferMoney.find({ to: req.params.to }, function (
    err,
    patnersell
  ) {
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

};

exports.gettransfertoyouwithstatus = function (req, res) {
  TransferMoney.find({ to: req.params.to , status: req.params.status }, function (
    err,
    patnersell
  ) {
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

};

exports.gettransfertoyouwithstatusanddate = function (req, res) {
  TransferMoney.find({ to: req.params.to , status: req.params.status,"daterecived": {"$gte": req.params.fromdate, "$lt": req.params.todate}}, function (
    err,
    patnersell
  ) {
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

};

exports.gettransfertoyouwithdate = function (req, res) {
  TransferMoney.find({ to: req.params.to ,"daterecived": {"$gte": req.params.fromdate, "$lt": req.params.todate}}, function (
    err,
    patnersell
  ) {
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

};

exports.gettransfertoyouwithdateandstatusandpartner = function (req, res) {
  TransferMoney.find({ to: req.params.to, from: req.params.from,status: req.params.status ,"daterecived": {"$gte": req.params.fromdate, "$lt": req.params.todate}}, function (
    err,
    patnersell
  ) {
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

};

exports.gettransfertoyouwithandstatusandpartner = function (req, res) {
  TransferMoney.find({ to: req.params.to, from: req.params.from,status: req.params.status}, function (
    err,
    patnersell
  ) {
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

};

exports.gettransfertoyouwithdateandpartner = function (req, res) {
  TransferMoney.find({ to: req.params.to,from: req.params.from,"daterecived": {"$gte": req.params.fromdate, "$lt": req.params.todate}}, function (
    err,
    patnersell
  ) {
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

};

exports.gettransfertoyouwithpartner = function (req, res) {
  TransferMoney.find({ to: req.params.to,from: req.params.from}, function (
    err,
    patnersell
  ) {
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

};
