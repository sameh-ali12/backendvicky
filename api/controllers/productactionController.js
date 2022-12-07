"use strict";
var mongoose = require("mongoose"),
  StoreActions = mongoose.model("storeactions"),
  PartnerSell = mongoose.model("partnersells"),
  Product = mongoose.model("products"),
  BuyFromSuppliers = mongoose.model("buyfromsuppliers"),
  SellToClients = mongoose.model("selltoclients"),
  CarUpload = mongoose.model("caruploads"),
  CarDownload = mongoose.model("cardownloads"),
  TransferProduct = mongoose.model("transferproducts"),
  User = mongoose.model("User"),
  Store = mongoose.model("stores"),
  Sales = mongoose.model("sales"),
  Suppliers = mongoose.model("suppliers"),
  Clients = mongoose.model("clients"),
  ProductAction = mongoose.model("productactions");


exports.productaction = function (req, res) {
  ProductAction.find(
    {
      user: req.params.user,
      "productlist.productid": req.params.productid,
       "daterecived": {"$gte": req.params.fromdate, "$lt": req.params.todate}
    },
    function (err, stores) {
      if (err) {
        return res.json({ code: 21, message: err });
      } else {
        return res.json({ code: 100, obj: stores });
      }
    }
  )  .populate({
    path: "productlist.productid",
    model: Product
  })
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
        ,
        {
          path: "store",
          model: Store
        }
        
      ],
    })
    .populate({
      path: "sellforclient.billid",
      model: SellToClients,
      populate: [
        {
          path: "details.productid",
          model: Product,
        },
        {
          path: "supplier",
          model: Suppliers,
        }, {
          path: "client",
          model: Clients,
        },
         {
          path: "sales",
          model: Sales,
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
    .populate({
      path: "carupload.caruploadid",
      model: CarUpload,
      populate: [
        {
          path: "details.productid",
          model: Product,
        },
        {
          path: "sales",
          model: Sales,
        },
        {
          path: "details.store",
          model: Store
        }
      ]
    })
    .populate({
      path: "cardownload.cardownloadid",
      model: CarDownload,
      populate: [
        {
          path: "details.productid",
          model: Product,
        },
        {
          path: "sales",
          model: Sales,
        },
        {
          path: "details.store",
          model: Store
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
        {
          path: "supplier",
          model: Suppliers,
        },
        
        
        {
          path: "details.fromstore",
          model: Store
        }
      ],
    })
    .populate({
      path: "transferproducts.transferid",
      model: TransferProduct,
      populate: [
        {
          path: "details.productid",
          model: Product,
        },
        {
          path: "details.store",
          model: Store,
        },
        {
          path: "tostore",
          model: Store,
        },
      ],
    });
};
