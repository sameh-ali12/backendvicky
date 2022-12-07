"use strict";
var mongoose = require("mongoose"),
TreasuryActions = mongoose.model("treasuryactions"),
PartnerSell = mongoose.model("partnersells"),
Product = mongoose.model("products"),
BuyFromSuppliers = mongoose.model("buyfromsuppliers"),
SellToClients = mongoose.model("selltoclients"),
User = mongoose.model("User"),
Store = mongoose.model("stores"),
Sales = mongoose.model("sales"),
Suppliers = mongoose.model("suppliers"),
Clients = mongoose.model("clients"),
TransferMoney = mongoose.model("transfers"),
Treasury = mongoose.model("treasuries"),
PaymentToSuppliers = mongoose.model("paymenttosuppliers"),
Check = mongoose.model("checks"),
PaymentFromClients = mongoose.model("PaymentFromClients"),
Expenses = mongoose.model("expenses"),
Expensescat = mongoose.model("expensescat");





exports.addtreasuryaction = function (req, res) {
  var newTreasuryAction = new TreasuryActions(req.body);
  newTreasuryAction.save(function (err, action) {
    if (err) {
      return res.status(400).send({
        message: err,
      });
    } else {
      return res.json({ code: 100, obj: action });
    }
  });
};


exports.treasuryactions = function (req, res) {
  TreasuryActions.find(
    {
      user: req.params.user,
      treasury: req.params.treasury,
       "date": {"$gte": req.params.fromdate, "$lt": req.params.todate}
    },
    function (err, obj) {
      if (err) {
        return res.json({ code: 21, message: err });
      } else {
        return res.json({ code: 100, obj: obj });
      }
    }
  )
    .populate({
      path: "buyinside.billid",
      model: PartnerSell,
      populate: [
        {
          path: "details.productid",
          model: Product,
        },
        {
          path: "to",
          model: User,
        },
        {
          path: "details.fromstore",
          model: Store,
        },
      ],
    })
    .populate({
      path: "sellinside.billid",
      model: PartnerSell,
      populate: [
        {
          path: "details.productid",
          model: Product,
        },
        {
          path: "from",
          model: User,
        },
        {
          path: "tostore",
          model: Store,
        },
      ],
    })
    .populate({
      path: "buyfromsupplier.billid",
      model: BuyFromSuppliers,
      populate: [
        {
          path: "details.productid",
          model: Product,
        },
        {
          path: "supplier",
          model: Suppliers,
        },
        
        {
          path: "client",
          model: Clients,
        }
      ],
    })
    .populate({
      path: "selltoclients.billid",
      model: SellToClients,
      populate: [
        {
          path: "details.productid",
          model: Product
        },
        {
          path: "sales",
          model: Sales
        },
        {
          path: "client",
          model: Clients
        },
        {
          path: "supplier",
          model: Suppliers,
        }

      ],
    })
    .populate({
      path: "rebackfromsupplier.billid",
      model: BuyFromSuppliers,
      populate: [
        {
          path: "rebackdetails.details.productid",
          model: Product,
        },
        {
          path: "supplier",
          model: Suppliers,
        },
        {
          path: "client",
          model: Clients,
        }
      ],
    })
    .populate({
      path: "rebackselltoclients.billid",
      model: SellToClients,
      populate: [
        {
          path: "rebackdetails.details.productid",
          model: Product,
        },{
          path: "client",
          model: Clients,
        },
        
        {
          path: "supplier",
          model: Suppliers,
        }
      ],
    })
    .populate({
      path: "sellfromstore.billid",
      model: SellToClients,
      populate: [
        {
          path: "details.productid",
          model: Product,
        },
        {
          path: "client",
          model: Clients,
        },
        ,
        {
          path: "supplier",
          model: Suppliers,
        }
      ],
    })
    .populate({
      path: "partnertransfermoney.transferid",
      model: TransferMoney,
      populate: [
        {
          path: "to",
          model: User,
        },
        {
          path: "from",
          model: User,
        }, 
        {
          path: "fromtreasury",
          model: Treasury
        },
        {
          path: "totreasury",
          model: Treasury
        },
      ],
    })  
    .populate({
      path: "paymenttosuppliers.paymenttosupplierid",
      model: PaymentToSuppliers,
      populate: [
        {
          path: "supplier",
          model: Suppliers
        }
      ],
    }) 
    .populate({
      path: "checkadd.checkid",
      model:Check,
      populate: [
        {
          path: "client",
          model: Clients
        }
      ],
    }) 
    .populate({
      path: "checkcash.checkid",
      model:Check,
      populate: [
        {
          path: "client",
          model: Clients
        }
      ],
    }) 
    .populate({
      path: "checkreback.checkid",
      model:Check,
      populate: [
        {
          path: "client",
          model: Clients
        }
      ],
    }) 
    .populate({
      path: "paymentfromclients.paymentid",
      model: PaymentFromClients,
      populate: [
        {
          path: "client",
          model: Clients
        }
      ],
    }) 
    .populate({
      path: "expenses.expensesid",
      model: Expenses,
      populate: [
        {
          path: "cat",
          model: Expensescat
        }
      ],
    }) 
    .populate({
      path: "rebackfromsupplier.billid",
      model: BuyFromSuppliers,
      populate: [
        {
          path: "rebackdetails.details.productid",
          model: Product,
        },
        {
          path: "supplier",
          model: Suppliers,
        },        
        {
          path: "client",
          model: Clients,
        }
      ],
    })
    .populate({
      path: "rebackselltoclients.billid",
      model: SellToClients,
      populate: [
        {
          path: "rebackdetails.details.productid",
          model: Product,
        },{
          path: "client",
          model: Clients,
        },
        {
          path: "supplier",
          model: Suppliers
        }
      ],
    })    
};

