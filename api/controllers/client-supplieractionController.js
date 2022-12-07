"use strict";
  var mongoose = require("mongoose"),
  ClientsActions = mongoose.model("clientandsupplieractions"),
  Product = mongoose.model("products"),
  BuyFromSuppliers = mongoose.model("buyfromsuppliers"),
  SellToClients = mongoose.model("selltoclients"),
  Sales = mongoose.model("sales"),
  Suppliers = mongoose.model("suppliers"),
  Clients = mongoose.model("clients"),
  PaymentToSuppliers = mongoose.model("paymenttosuppliers"),
  PaymentFromClients = mongoose.model("PaymentFromClients"),
  DiscounttoClients = mongoose.model("discounttoclients");

exports.clientsactions = function (req, res) {
  ClientsActions.find(
    {
      user: req.params.user,
      client: req.params.client,
      date: { $gte: req.params.fromdate, $lt: req.params.todate },
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
        },
      ],
    })
    .populate({
      path: "selltoclients.billid",
      model: SellToClients,
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
          path: "client",
          model: Clients,
        },
        {
          path: "supplier",
          model: Suppliers,
        },
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
        },
      ],
    })
    .populate({
      path: "rebackselltoclients.billid",
      model: SellToClients,
      populate: [
        {
          path: "rebackdetails.details.productid",
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
      ],
    })
    .populate({
      path: "paymenttosuppliers.paymenttosupplierid",
      model: PaymentToSuppliers,
      populate: [
        {
          path: "supplier",
          model: Suppliers,
        },
      ],
    })
    .populate({
      path: "paymentfromclients.paymentid",
      model: PaymentFromClients,
      populate: [
        {
          path: "client",
          model: Clients,
        },
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
        },
      ],
    })
    .populate({
      path: "rebackselltoclients.billid",
      model: SellToClients,
      populate: [
        {
          path: "rebackdetails.details.productid",
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
      ],
    })
    .populate({
      path: "discountforclients.discountid",
      model: DiscounttoClients,
      populate: [
        {
          path: "client",
          model: Clients
        },
      ],
    });
};
