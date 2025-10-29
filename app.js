"use strict";

var express = require("express"),
 cors = require('cors'),
  app = express(),
  port = process.env.PORT || 3000,
  fs = require("fs"),
  mongoose = require("mongoose"),
  User = require("./api/models/userModel"),
  Product = require("./api/models/productModel"),
  Store = require("./api/models/storeModel"),
  Sales = require("./api/models/salesModel"),
  Treasury = require("./api/models/treasuryModel"),
  Suppliers = require("./api/models/suppliersModel"),
  Itineraries = require("./api/models/itinerariesModel"),
  Clients = require("./api/models/clientsModel"),
  ExpensesCat = require("./api/models/expensescatModel"),
  Expenses = require("./api/models/expensesModel"),
  Check = require("./api/models/checkModel"),
  ParnterSell = require("./api/models/partnersellModel"),
  TranserMoney= require("./api/models/partnertransfermoneyModel"),
  CarUpload= require("./api/models/caruploadModel"),
  CarDownload= require("./api/models/cardownloadModel"),
  PaymentTosuppliers= require("./api/models/paymenttosuppliersModel"),
  BuyFromSuppliers= require("./api/models/buyfromsuppliersModel"),
  SellToClients= require("./api/models/selltoclientsModel"),
  StoreAction = require("./api/models/storeactionModel"),
  TreasuryAction = require("./api/models/treasuryactionModel"),
  PaymentFromClients = require("./api/models/paymentfromclientsModel"),
  liquidation = require("./api/models/liquidationModel"),
  transferproduct = require("./api/models/transferproductModel"),
  discount = require("./api/models/discounttoclientsModel"),
  clientandsupplieraction = require("./api/models/client-supplier-actionModel"),
  transferproductsales = require("./api/models/transferproductsalesModel"),
  productactions = require("./api/models/productactionModel"),
  path = require("path"),
  DIR = "./upload/",
  bodyParser = require("body-parser"),
  cors = require("cors"),
  jwt = require("jsonwebtoken");
  app.use(cors())

app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(bodyParser.json());
app.use(bodyParser.json({limit: '50mb', extended: true}))





// mongoose.connect("mongodb+srv://samehali:QWqw1234@cluster1.4744h.mongodb.net/testapp?retryWrites=true&w=majority", {
//     useNewUrlParser: true,
//   })
//   .then(() => console.log("DB Connected!"))
//   .catch((err) => {
//     console.log("message");
//   });
// mongoose.set("useCreateIndex", true);



// mongoose.connect("mongodb+srv://admin:QWqw1234@i-monitor.4744h.mongodb.net/i-monitor?retryWrites=true&w=majority", {
//     useNewUrlParser: true,
//   })
//   .then(() => console.log("DB Connected!"))
//   .catch((err) => {
//     console.log("message");
//   });
// mongoose.set("useCreateIndex", true);



// mongoose.connect("mongodb+srv://samehali:QWqw1234@cluster1.4744h.mongodb.net/test?retryWrites=true&w=majority", {
//     useNewUrlParser: true,
//   })
//   .then(() => console.log("DB Connected!"))
//   .catch((err) => {
//     console.log("message");
//   });
// mongoose.set("useCreateIndex", true);


mongoose.connect("mongodb+srv://sameh:QWqw1234@vicky.a4o16.mongodb.net/vicky?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("DB Connected!"))
  .catch((err) => {
    console.log("message");
  });
mongoose.set("useCreateIndex", true);





app.use(function (req, res, next) {

  
  // Website you wish to allow to connect
  // res.setHeader('Access-Control-Allow-Origin', 'https://sales-art-bc8a3.web.app');
   res.setHeader('Access-Control-Allow-Origin', 'https://vickyvicky.web.app');
   
   // res.setHeader('Access-Control-Allow-Origin', 'https://sales-art-bc8a3.web.app');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});


// app.use(function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', '*');
//     res.header("Access-Control-Allow-Credentials", true);
//     if (req.method === "OPTIONS")
//       res.send(200);
//     else
//       next();
  
//   });

app.use(function (req, res, next) {
  if (req.headers && req.headers.authorization) {
    jwt.verify(req.headers.authorization, "RESTFULAPIs", function (
      err,
      decode
    ) {
      if (err) req.user = undefined;
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});

var routes = require("./api/routes/allRoutes.js");
routes(app), app.use("/api", routes);

app.listen(port);
// app.use('/uploads', express.static(path.join(__dirname + '/uploads')));
console.log("todo list RESTful API server started on: " + port);
module.exports = app;
