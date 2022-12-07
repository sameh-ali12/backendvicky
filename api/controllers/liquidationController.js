"use strict";
var mongoose = require("mongoose"),
  liquidations = mongoose.model("liquidations"),
  User = mongoose.model("User"),
  PartnerSell = mongoose.model("partnersells"),
  TransferMoney = mongoose.model("transfers"),
  Product = mongoose.model("products"),
  Store = mongoose.model("stores"),
  Treasury = mongoose.model("treasuries");
exports.addliquidation = function (req, res) {
  var newliquidation = new liquidations(req.body);
  newliquidation.save(function (err, liquidation) {
    if (err) {
      return res.status(400).send({
        message: err,
      });
    } else {
      //// edit user
      User.find({ _id: req.body.foruser }, function (err, user) {
        if (err) {
          console.log(err);
        } else {



          for (const index in user[0].partners) {
            if (user[0].partners[index].user == req.body.touser) {
              console.log(user[0].partners[index])
              user[0].partners[index].sellbills = [];
              user[0].partners[index].buybills = [];
              user[0].partners[index].transferfromus = [];
              user[0].partners[index].transferfromhim = [];
              user[0].partners[index].lastliquidation = liquidation._id;
            }
          }
          User.findOneAndUpdate(
            { _id: req.body.foruser },
            user[0],
            function (err, useredited) {
              if (err) {
                console.log(err);
              } else {
                return res.json({ code: 100, data: liquidation });
              }
            }
          );
        }
      });

    
    }
  });
};

/////reports 
exports.liquidationwithparnter = function (req, res) {
  liquidations.find({touser:req.params.touser,foruser:req.params.foruser})
    .populate(
      {
        path: "buybills",
        model: PartnerSell,
        populate: [
          {
            path: "from",
            model: User,
          },
          {
            path: "to",
            model: User,
          },
        ],
      })
      .populate(
        {
          path: "buybills",
          model: PartnerSell,
          populate: [
            {
              path: "details.productid",
              model: Product
            }
          ],
        })
        .populate(
          {
            path: "buybills",
            model: PartnerSell,
            populate: [
              {
                path: "fromtreasury",
                model: Treasury
              }
            ],
          })
          .populate(
            {
              path: "buybills",
              model: PartnerSell,
              populate: [
                {
                  path: "tostore",
                  model: Store
                }
              ],
            })
      .populate(
        {
          path: "sellbills",
          model: PartnerSell,
          populate: [
            {
              path: "from",
              model: User,
            },
            {
              path: "to",
              model: User,
            },
          ],
        })
        .populate(
          {
            path: "sellbills",
            model: PartnerSell,
            populate: [
              {
                path: "details.productid",
                model: Product
              }
            ],
          }).populate(
            {
              path: "sellbills",
              model: PartnerSell,
              populate: [
                {
                  path: "details.fromstore",
                  model: Store
                }
              ],
            })
            .populate(
              {
                path: "sellbills",
                model: PartnerSell,
                populate: [
                  {
                    path: "totreasury",
                    model: Treasury
                  }
                ],
              })
        .populate(
          {
            path: "transferfromus",
            model: TransferMoney,
            populate: [
              {
                path: "from",
                model: User,
              },
              {
                path: "to",
                model: User,
              },
            ],
          }).populate(
            {
              path: "transferfromus",
              model: TransferMoney,
              populate: [
                {
                  path: "fromtreasury",
                  model: Treasury,
                }
              ],
            })
          .populate(
            {
              path: "transferfromhim",
              model: TransferMoney,
              populate: [
                {
                  path: "from",
                  model: User,
                },
                {
                  path: "to",
                  model: User,
                },
              ],
            }).populate(
              {
                path: "transferfromhim",
                model: TransferMoney,
                populate: [
                  {
                    path: "totreasury",
                    model: Treasury,
                  }
                ],
              })
    .exec(function (err, doc) {
      res.json({code:100,obj:doc});
    });

  
};

exports.liquidationwithparnteranddate = function (req, res) {
  liquidations.find({touser:req.params.touser,foruser:req.params.foruser,"Date": {"$gte": req.params.from, "$lt": req.params.to}})
    .populate(
      {
        path: "buybills",
        model: PartnerSell,
        populate: [
          {
            path: "from",
            model: User,
          },
          {
            path: "to",
            model: User,
          },
        ],
      })
      .populate(
        {
          path: "buybills",
          model: PartnerSell,
          populate: [
            {
              path: "details.productid",
              model: Product
            }
          ],
        })
        .populate(
          {
            path: "buybills",
            model: PartnerSell,
            populate: [
              {
                path: "fromtreasury",
                model: Treasury
              }
            ],
          })
          .populate(
            {
              path: "buybills",
              model: PartnerSell,
              populate: [
                {
                  path: "tostore",
                  model: Store
                }
              ],
            })
      .populate(
        {
          path: "sellbills",
          model: PartnerSell,
          populate: [
            {
              path: "from",
              model: User,
            },
            {
              path: "to",
              model: User,
            },
          ],
        })
        .populate(
          {
            path: "sellbills",
            model: PartnerSell,
            populate: [
              {
                path: "details.productid",
                model: Product
              }
            ],
          }).populate(
            {
              path: "sellbills",
              model: PartnerSell,
              populate: [
                {
                  path: "details.fromstore",
                  model: Store
                }
              ],
            })
            .populate(
              {
                path: "sellbills",
                model: PartnerSell,
                populate: [
                  {
                    path: "totreasury",
                    model: Treasury
                  }
                ],
              })
        .populate(
          {
            path: "transferfromus",
            model: TransferMoney,
            populate: [
              {
                path: "from",
                model: User,
              },
              {
                path: "to",
                model: User,
              },
            ],
          }).populate(
            {
              path: "transferfromus",
              model: TransferMoney,
              populate: [
                {
                  path: "fromtreasury",
                  model: Treasury,
                }
              ],
            })
          .populate(
            {
              path: "transferfromhim",
              model: TransferMoney,
              populate: [
                {
                  path: "from",
                  model: User,
                },
                {
                  path: "to",
                  model: User,
                },
              ],
            }).populate(
              {
                path: "transferfromhim",
                model: TransferMoney,
                populate: [
                  {
                    path: "totreasury",
                    model: Treasury,
                  }
                ],
              })
    .exec(function (err, doc) {
      res.json({code:100,obj:doc});
    });

  
};