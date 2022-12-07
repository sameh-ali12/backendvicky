"use strict";
var mongoose = require("mongoose"),
  Check = mongoose.model("checks"),
  TreasuryActions = mongoose.model("treasuryactions"),
  Clients = mongoose.model("clients"),
  Treasury = mongoose.model("treasuries");

exports.addcheck = function (req, res) {
  var newCheck = new Check(req.body);
  newCheck.save(function (err, checks) {
    if (err) {
      return res.status(400).send({
        message: err,
      });
    } else {
      /////update client obj
      Clients.find({ _id: checks.client }, function (err, client) {
        if (err) {
          console.log(err);
        } else {
          client[0].checksvalue = client[0].checksvalue + checks.value;
          Clients.findOneAndUpdate({ _id: client[0]._id }, client[0], function (
            err,
            editclient
          ) {
            if (err) {
              console.log(err);
            } else {
            }
          });
        }
      });

      Treasury.find({ _id: checks.treasury }, function (err, treasury) {
        if (err) {
          console.log(err);
        } else {
          treasury[0].valuechecks = treasury[0].valuechecks + checks.value;
          Treasury.findOneAndUpdate(
            { _id: treasury[0]._id },
            treasury[0],
            function (err, edittreasury) {
              if (err) {
                console.log(err);
              } else {
                var obj = {
                  checkadd: {
                    status: true,
                    checkid: checks._id,
                    treasuryvalue: treasury[0].value,
                    checktreasuryvalue: treasury[0].valuechecks,
                    date:req.body.daterecived
                  },
                  treasury: treasury[0]._id,
                  user: req.body.user,
                  date:req.body.daterecived

                };
                var newTreasuryAction = new TreasuryActions(obj);
                newTreasuryAction.save(function (err, action) {
                  if (err) {
                    console.log(err);
                  } else {
                  }
                });
                return res.json({ code: 100, obj: checks });
              }
            }
          );
        }
      });
    }
  });
};

exports.allcheck = function (req, res) {
  Check.find({ user: req.params.userid, status: req.params.status }, function (
    err,
    checks
  ) {
    if (err) {
      return res.json({ code: 21, message: err });
    } else {
      return res.json({ code: 100, obj: checks });
    }
  })
    .populate("client")
    .populate("treasury");
};
exports.allcheckforclient = function (req, res) {
  Check.find(
    {
      user: req.params.userid,
      status: req.params.status,
      client: req.params.client,
    },
    function (err, checks) {
      if (err) {
        return res.json({ code: 21, message: err });
      } else {
        return res.json({ code: 100, obj: checks });
      }
    }
  )
    .populate("client")
    .populate("treasury");
};

exports.allcheckforclientandcheckno = function (req, res) {
  Check.find(
    {
      user: req.params.userid,
      status: req.params.status,
      client: req.params.client,
      checkno: req.params.checkno,
    },
    function (err, checks) {
      if (err) {
        return res.json({ code: 21, message: err });
      } else {
        return res.json({ code: 100, obj: checks });
      }
    }
  )
    .populate("client")
    .populate("treasury");
};

exports.editcheck = function (req, res) {
  Check.findOneAndUpdate({ _id: req.params.id }, req.body, function (
    err,
    checks
  ) {
    if (err) {
      return res.json({ code: 21, message: err });
    } else {
      /////update client obj
      Clients.find({ _id: checks.client }, function (err, client) {
        if (err) {
          console.log(err);
        } else {
          if (req.body.status == "reback") {
            client[0].checksvalue = client[0].checksvalue - checks.value;
          } else {
            if (req.body.status == "cashed") {
              client[0].checksvalue = client[0].checksvalue - checks.value;
              client[0].debtvalue = client[0].debtvalue - checks.value;
            }
          }
          Clients.findOneAndUpdate({ _id: client[0]._id }, client[0], function (
            err,
            editclient
          ) {
            if (err) {
              console.log(err);
            } else {
            }
          });
        }
      });

      Treasury.find({ _id: checks.treasury }, function (err, treasury) {
        if (err) {
          console.log(err);
        } else {
          if (req.body.status == "reback") {
            treasury[0].valuechecks = treasury[0].valuechecks - checks.value;
          } else {
            if (req.body.status == "cashed") {
              treasury[0].valuechecks = treasury[0].valuechecks - checks.value;
              treasury[0].value = treasury[0].value + checks.value;
            }
          }
          Treasury.findOneAndUpdate(
            { _id: treasury[0]._id },
            treasury[0],
            function (err, edittreasury) {
              if (err) {
                console.log(err);
              } else {
                var obj;
                if (req.body.status == "reback") {
                   obj = {
                    checkreback: {
                      status: true,
                      checkid: checks._id,
                      treasuryvalue: treasury[0].value,
                      checktreasuryvalue: treasury[0].valuechecks,
                      date:req.body.dateaction
                    },
                    treasury: treasury[0]._id,
                    user: checks.user,
                    date:req.body.dateaction
                  };
                } else {
                  if (req.body.status == "cashed") {
                     obj = {
                      checkcash: {
                        status: true,
                        checkid: checks._id,
                        treasuryvalue: treasury[0].value,
                        checktreasuryvalue: treasury[0].valuechecks,
                        date:req.body.dateaction
                      },
                      treasury: treasury[0]._id,
                      user: checks.user,
                      date:req.body.dateaction
                    };
                  }
                }

                var newTreasuryAction = new TreasuryActions(obj);
                newTreasuryAction.save(function (err, action) {
                  if (err) {
                    console.log(err);
                  } else {
                  }
                });
                return res.json({ code: 100, obj: checks });
              }
            }
          );
        }
      });
    }
  });
};

///reports
exports.getallcheckforallclientsandalltreasury = function (req, res) {
  Check.find(
    {
      user: req.params.user,
      status: req.params.status
    },
    function (err, checks) {
      if (err) {
        return res.json({ code: 21, message: err });
      } else {
        return res.json({ code: 100, obj: checks });
      }
    }
  )
    .populate("client")
    .populate("treasury");
};

exports.getallcheckforclientsandalltreasury = function (req, res) {
  Check.find(
    {
      user: req.params.user,
      status: req.params.status,
      client:req.params.client
    },
    function (err, checks) {
      if (err) {
        return res.json({ code: 21, message: err });
      } else {
        return res.json({ code: 100, obj: checks });
      }
    }
  )
    .populate("client")
    .populate("treasury");
};

exports.getallcheckforclientsandtreasury = function (req, res) {
  Check.find(
    {
      user: req.params.user,
      status: req.params.status,
      client:req.params.client,
      treasury:req.params.treasury
    },
    function (err, checks) {
      if (err) {
        return res.json({ code: 21, message: err });
      } else {
        return res.json({ code: 100, obj: checks });
      }
    }
  )
    .populate("client")
    .populate("treasury");
};

exports.getallcheckforallclientsandtreasury = function (req, res) {
  Check.find(
    {
      user: req.params.user,
      status: req.params.status,
      treasury:req.params.treasury
    },
    function (err, checks) {
      if (err) {
        return res.json({ code: 21, message: err });
      } else {
        return res.json({ code: 100, obj: checks });
      }
    }
  )
    .populate("client")
    .populate("treasury");
};