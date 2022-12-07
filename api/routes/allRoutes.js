"use strict";

const { cardownload } = require("../controllers/cardownloadController.js");
const selltoclientsModel = require("../models/selltoclientsModel.js");

module.exports = function(app) {
  var userHandlers = require("../controllers/userController.js"),
  products = require("../controllers/productController.js"),
  stores = require("../controllers/storeController.js"),
  sales = require("../controllers/salesController.js"),
  treasuries= require("../controllers/treasuryController.js"),
  suppliers= require("../controllers/suppliersController.js"),
  itineraries= require("../controllers/itinerariesController.js"),
  clients= require("../controllers/clientsController.js"),
  expensescat= require("../controllers/expensescatController.js"),
  expenses= require("../controllers/expensesController.js"),
  checks= require("../controllers/checkController.js"),
  partnersell= require("../controllers/partnersellController.js"),
  transfermoney= require("../controllers/transfermoneyController.js"),
  carupload= require("../controllers/carupladController.js"),
  transferproduct= require("../controllers/transferproductController.js"),
  cardownload= require("../controllers/cardownloadController.js"),
  paymenttosuppliers= require("../controllers/paymenttosuppliersController.js"),
  buyfromsuppliers= require("../controllers/buyfromsuppliersController.js"),
  selltoclients= require("../controllers/selltoclientController.js"),
  paymentfromclients = require("../controllers/paymentfromclientsController.js"),
  treasuryaction = require("../controllers/treasuryactionController.js"),
  storeaction = require("../controllers/storeactionController.js"),
  Liquidation= require("../controllers/liquidationController.js"),
  clientactions= require("../controllers/client-supplieractionController.js"),
  transferproductsales= require("../controllers/transferproductssalesController.js"),
  productaction= require("../controllers/productactionController.js");


  // user
  app.route("/user/sign-in").post(userHandlers.sign_in);
  app.route("/user/forgetpassword").post(userHandlers.forgetpassword);
  app.route("/user/restpassword/:token").put(userHandlers.restpassword);
  app.route("/user/:id").put(userHandlers.loginRequired,userHandlers.edituser);
  app.route("/user/register").post(userHandlers.loginRequired,userHandlers.register);
  app.route("/user/:id").get(userHandlers.loginRequired,userHandlers.getusersallowed);
  app.route("/singleuser/:id").get(userHandlers.loginRequired,userHandlers.singleuser);
  app.route("/userallinfo/:id").get(userHandlers.loginRequired,userHandlers.singleuserallinfo);
  // products
  app.route("/products").post(userHandlers.loginRequired,products.addproduct);
  app.route("/products").get(userHandlers.loginRequired,products.allproducts);
  app.route("/products/:id").get(userHandlers.loginRequired,products.singleproduct);
  app.route("/products/:id").delete(userHandlers.loginRequired,products.deleteproduct);
  app.route("/products/:id").put(userHandlers.loginRequired,products.editproduct);
  // store
  app.route("/stores").post(userHandlers.loginRequired,stores.addstore);
  app.route("/stores/:userid").get(userHandlers.loginRequired,stores.allstores);
  app.route("/stores/:id").delete(userHandlers.loginRequired,stores.deletestore);
  app.route("/store/:id").get(userHandlers.loginRequired,stores.singlestore);
  // sales
  app.route("/sales").post(userHandlers.loginRequired,sales.addsales);
  app.route("/sales/:userid").get(userHandlers.loginRequired,sales.allsales);
  app.route("/sales/:id").delete(userHandlers.loginRequired,sales.deletesales);
  app.route("/sales/:id").put(userHandlers.loginRequired,sales.updatesales);
  app.route("/onesales/:id").get(userHandlers.loginRequired,sales.getonesalesdata);
  // treasury
  app.route("/treasuries").post(userHandlers.loginRequired,treasuries.addtreasury);
  app.route("/treasuries/:userid").get(userHandlers.loginRequired,treasuries.alltreasury);
  app.route("/treasuries/:id").delete(userHandlers.loginRequired,treasuries.deletetreasury);
  app.route("/treasuries/:id").put(userHandlers.loginRequired,treasuries.edittreasury);
  app.route("/treasury/:id").get(userHandlers.loginRequired,treasuries.gettreasurywithid);
  // suppliers
  app.route("/suppliers").post(userHandlers.loginRequired,suppliers.addsuppliers);
  app.route("/suppliers/:userid").get(userHandlers.loginRequired,suppliers.allSuppliers);
  app.route("/suppliers/:id").delete(userHandlers.loginRequired,suppliers.deletesuppliers);
  app.route("/singlesupplier/:id").get(userHandlers.loginRequired,suppliers.singleSupplier);
  // itineraries
  app.route("/itineraries").post(userHandlers.loginRequired,itineraries.additineraries);
  app.route("/itineraries/:userid").get(userHandlers.loginRequired,itineraries.allitineraries);
  app.route("/itineraries/:id").delete(userHandlers.loginRequired,itineraries.deleteitineraries);
  app.route("/edititinerary/:id").put(userHandlers.loginRequired,itineraries.edititinerary);
  // clients
  app.route("/clients").post(userHandlers.loginRequired,clients.addclient);
  app.route("/clients/:userid").get(userHandlers.loginRequired,clients.allclient);
  app.route("/clients/:id").delete(userHandlers.loginRequired,clients.deleteclient);
  app.route("/client/:id").get(userHandlers.loginRequired,clients.clientwithid);
  app.route("/editclient/:id").put(userHandlers.loginRequired,clients.editclient);
  // expensescat
  app.route("/expensescat").post(userHandlers.loginRequired,expensescat.addexpenses);
  app.route("/expensescat/:userid").get(userHandlers.loginRequired,expensescat.allexpenses);
  app.route("/expensescat/:id").delete(userHandlers.loginRequired,expensescat.deleteexpenses);
  // expenses
  app.route("/expenses").post(userHandlers.loginRequired,expenses.addexpenses);
  app.route("/expenses/:userid").get(userHandlers.loginRequired,expenses.allexpenses);
  app.route("/expenses/:id").delete(userHandlers.loginRequired,expenses.deleteexpenses);
  // checks
  app.route("/checks").post(userHandlers.loginRequired,checks.addcheck);
  app.route("/checks/:userid/:status").get(userHandlers.loginRequired,checks.allcheck);
  app.route("/checks/:id").put(userHandlers.loginRequired,checks.editcheck);
  app.route("/checks/:userid/:status/:client").get(userHandlers.loginRequired,checks.allcheckforclient);
  app.route("/checks/:userid/:status/:client/:checkno").get(userHandlers.loginRequired,checks.allcheckforclientandcheckno);
  //partner sell
  app.route("/addpartnersell").post(userHandlers.loginRequired,partnersell.addpartnersell);
  app.route("/addpartnersell/:id").get(userHandlers.loginRequired,partnersell.partnersellbyid);
  app.route("/addpartnersell/:to/:status").get(userHandlers.loginRequired,partnersell.partnersellforstatus);
  app.route("/editpartnersell/:id").put(userHandlers.loginRequired,partnersell.editpartnersell);
  app.route("/editpartnersellprice/:id").put(userHandlers.loginRequired,partnersell.editparntersellprice);
  app.route("/checkacceptpartnersell").post(userHandlers.loginRequired,partnersell.checkacceptpartnersell);
  //partner transfer money
  app.route("/addtransfer").post(userHandlers.loginRequired,transfermoney.addtransfer);
  app.route("/transfer/:id").get(userHandlers.loginRequired,transfermoney.transfermoneybyid);
  app.route("/transfer/:to/:status").get(userHandlers.loginRequired,transfermoney.trnasfermoneyforstatus);
  app.route("/edittransfer/:id").put(userHandlers.loginRequired,transfermoney.edittransfermoney);
  //car upload
  app.route("/addcarupload").post(userHandlers.loginRequired,carupload.addcarupload);
  app.route("/carupload/:userid/:date/:sales").get(userHandlers.loginRequired,carupload.carupload);
  //car download
  app.route("/addcardownload").post(userHandlers.loginRequired,cardownload.addcardownload);
  app.route("/cardownload/:userid/:date/:sales").get(userHandlers.loginRequired,cardownload.cardownload);
  //transfer products
  app.route("/addtransferproducts").post(userHandlers.loginRequired,transferproduct.addtransferproduct);
  //payment to suppliers
  app.route("/addpaymentforsuppliers").post(userHandlers.loginRequired,paymenttosuppliers.addpaymenttosuppliers);
  //payment from client && discounts
  app.route("/addpaymentformclients").post(userHandlers.loginRequired,paymentfromclients.addpaymentfromclients);
  app.route("/adddiscount").post(userHandlers.loginRequired,paymentfromclients.adddiscounttoclients);
  //buyfromsuppliers
  app.route("/buyfromsuppliers").post(userHandlers.loginRequired,buyfromsuppliers.addbuybill);
  app.route("/rebackbuyfromsuppliers/:id").put(userHandlers.loginRequired,buyfromsuppliers.editbuybill);
  app.route("/getbuyfromsupplierbill/:billno/:user").get(userHandlers.loginRequired,buyfromsuppliers.getbuybill);
  // sell to clients 
  app.route("/sellbill").post(userHandlers.loginRequired,selltoclients.addsellbill);
  app.route("/sellbillfromstore").post(userHandlers.loginRequired,selltoclients.addsellbillfromstore);
  app.route("/sellbill/:billno/:user").get(userHandlers.loginRequired,selltoclients.getsellbill);
  app.route("/sellbill/:id").put(userHandlers.loginRequired,selltoclients.editsellbill);
  //treasuryaction
  app.route("/addtreasuryaction").post(userHandlers.loginRequired,treasuryaction.addtreasuryaction);
  //store action
  app.route("/addstoreaction").post(userHandlers.loginRequired,storeaction.addstoreaction);
  //liquidation
  app.route("/addliquidation").post(userHandlers.loginRequired,Liquidation.addliquidation);
  //transfer products
  app.route("/transferproductsales").post(userHandlers.loginRequired,transferproductsales.transfersales);

  ///reports
  ///**partner reports */
  // sell
  app.route("/getallpartnersell/:from").get(userHandlers.loginRequired,partnersell.getallpartnersell);
  app.route("/getpartnersellwithstatus/:from/:status").get(userHandlers.loginRequired,partnersell.getpartnersellwithstatus);
  app.route("/getpartnersellwithdate/:from/:fromdate/:todate").get(userHandlers.loginRequired,partnersell.getpartnersellwithdate);
  app.route("/getpartnersellwithstatusanddate/:from/:status/:fromdate/:todate").get(userHandlers.loginRequired,partnersell.getpartnersellwithstatusanddate);
  app.route("/getpartnersellwithdateandstatusandpartner/:from/:to/:status/:fromdate/:todate").get(userHandlers.loginRequired,partnersell.getpartnersellwithdateandstatusandpartner);
  app.route("/getpartnersellwithandstatusandpartner/:from/:to/:status").get(userHandlers.loginRequired,partnersell. getpartnersellwithandstatusandpartner);
  app.route("/getpartnersellwithdateandpartner/:from/:to/:fromdate/:todate").get(userHandlers.loginRequired,partnersell.getpartnersellwithdateandpartner);
  app.route("/getpartnersellwithpartner/:from/:to").get(userHandlers.loginRequired,partnersell.getpartnersellwithpartner);
  // buy
  app.route("/getallpartnerbuy/:to").get(userHandlers.loginRequired,partnersell.getallpartnerbuy);
  app.route("/getpartnerbuywithstatus/:to/:status").get(userHandlers.loginRequired,partnersell.getpartnerbuywithstatus);
  app.route("/getpartnerbuywithdate/:to/:fromdate/:todate").get(userHandlers.loginRequired,partnersell.getpartnerbuywithdate);
  app.route("/getpartnerbuywithstatusanddate/:from/:status/:fromdate/:todate").get(userHandlers.loginRequired,partnersell.getpartnerbuywithstatusanddate);
  app.route("/getpartnerbuywithdateandstatusandpartner/:to/:from/:status/:fromdate/:todate").get(userHandlers.loginRequired,partnersell.getpartnerbuywithdateandstatusandpartner);
  app.route("/getpartnerbuywithandstatusandpartner/:to/:from/:status").get(userHandlers.loginRequired,partnersell. getpartnerbuywithandstatusandpartner);
  app.route("/getpartnerbuywithdateandpartner/:to/:from/:fromdate/:todate").get(userHandlers.loginRequired,partnersell.getpartnerbuywithdateandpartner);
  app.route("/getpartnerbuywithpartner/:to/:from").get(userHandlers.loginRequired,partnersell.getpartnerbuywithpartner);
    ///**transfer reports */
  // form you
  app.route("/getalltransferfromyou/:from").get(userHandlers.loginRequired,transfermoney.getalltransferfromyou);
  app.route("/gettransferfromyouwithstatus/:from/:status").get(userHandlers.loginRequired,transfermoney.gettransferfromyouwithstatus);
  app.route("/gettransferfromyouwithdate/:from/:fromdate/:todate").get(userHandlers.loginRequired,transfermoney.gettransferfromyouwithdate);
  app.route("/gettransferfromyouwithstatusanddate/:from/:status/:fromdate/:todate").get(userHandlers.loginRequired,transfermoney.gettransferfromyouwithstatusanddate);
  app.route("/gettransferfromyouwithdateandstatusandpartner/:from/:to/:status/:fromdate/:todate").get(userHandlers.loginRequired,transfermoney.gettransferfromyouwithdateandstatusandpartner);
  app.route("/gettransferfromyouwithandstatusandpartner/:from/:to/:status").get(userHandlers.loginRequired,transfermoney. gettransferfromyouwithandstatusandpartner);
  app.route("/gettransferfromyouwithdateandpartner/:from/:to/:fromdate/:todate").get(userHandlers.loginRequired,transfermoney.gettransferfromyouwithdateandpartner);
  app.route("/gettransferfromyouwithpartner/:from/:to").get(userHandlers.loginRequired,transfermoney.gettransferfromyouwithpartner);
  //  to you
  app.route("/getalltransfertoyou/:to").get(userHandlers.loginRequired,transfermoney.getalltransfertoyou);
  app.route("/gettransfertoyouwithstatus/:to/:status").get(userHandlers.loginRequired,transfermoney.gettransfertoyouwithstatus);
  app.route("/gettransfertoyouwithdate/:to/:fromdate/:todate").get(userHandlers.loginRequired,transfermoney.gettransfertoyouwithdate);
  app.route("/gettransfertoyouwithstatusanddate/:from/:status/:fromdate/:todate").get(userHandlers.loginRequired,transfermoney.gettransfertoyouwithstatusanddate);
  app.route("/gettransfertoyouwithdateandstatusandpartner/:to/:from/:status/:fromdate/:todate").get(userHandlers.loginRequired,transfermoney.gettransfertoyouwithdateandstatusandpartner);
  app.route("/gettransfertoyouwithandstatusandpartner/:to/:from/:status").get(userHandlers.loginRequired,transfermoney. gettransfertoyouwithandstatusandpartner);
  app.route("/gettransfertoyouwithdateandpartner/:to/:from/:fromdate/:todate").get(userHandlers.loginRequired,transfermoney.gettransfertoyouwithdateandpartner);
  app.route("/gettransfertoyouwithpartner/:to/:from").get(userHandlers.loginRequired,transfermoney.gettransfertoyouwithpartner);
  // reports liquidation
  app.route("/liquidationwithparnter/:touser/:foruser").get(userHandlers.loginRequired,Liquidation.liquidationwithparnter);
  app.route("/liquidationwithparnteranddate/:touser/:foruser/:from/:to").get(userHandlers.loginRequired,Liquidation.liquidationwithparnteranddate);
  //reports carupload
  app.route("/caruploadwithsales/:userid/:sales").get(userHandlers.loginRequired,carupload.caruploadwithsales);
  app.route("/caruploadwithstore/:userid/:store").get(userHandlers.loginRequired,carupload.caruploadwithstore);
  app.route("/caruploadwithstoreanddate/:userid/:store/:from/:to").get(userHandlers.loginRequired,carupload.caruploadwithstoreanddate);
  app.route("/caruploadwithsalesanddate/:userid/:sales/:from/:to").get(userHandlers.loginRequired,carupload.caruploadwithsalesanddate);
  app.route("/caruploadwithsalesandstore/:userid/:sales/:store").get(userHandlers.loginRequired,carupload.caruploadwithsalesandstore);
  app.route("/caruploadwithstoreandsalesanddate/:userid/:sales/:store/:from/:to").get(userHandlers.loginRequired,carupload.caruploadwithstoreandsalesanddate);
  //reports cardownload
  app.route("/cardownloadwithsales/:userid/:sales").get(userHandlers.loginRequired,cardownload.cardownloadwithsales);
  app.route("/cardownloadwithstore/:userid/:store").get(userHandlers.loginRequired,cardownload.cardownloadwithstore);
  app.route("/cardownloadwithstoreanddate/:userid/:store/:from/:to").get(userHandlers.loginRequired,cardownload.cardownloadwithstoreanddate);
  app.route("/cardownloadwithsalesanddate/:userid/:sales/:from/:to").get(userHandlers.loginRequired,cardownload.cardownloadwithsalesanddate);
  app.route("/cardownloadwithsalesandstore/:userid/:sales/:store").get(userHandlers.loginRequired,cardownload.cardownloadwithsalesandstore);
  app.route("/cardownloadwithstoreandsalesanddate/:userid/:sales/:store/:from/:to").get(userHandlers.loginRequired,cardownload.cardownloadwithstoreandsalesanddate);
  //reports transfer products on stores
  app.route("/transferproductsfromstore/:user/:store").get(userHandlers.loginRequired,transferproduct.transferproductsfromstore);
  app.route("/transferproductstostore/:user/:store").get(userHandlers.loginRequired,transferproduct.transferproductstostore);
  app.route("/transferproductstostoreanddate/:user/:store/:from/:to").get(userHandlers.loginRequired,transferproduct.transferproductstostoreanddate);
  app.route("/transferproductsfromstoreanddate/:user/:store/:from/:to").get(userHandlers.loginRequired,transferproduct.transferproductsfromstoreanddate);
  /// reports inventory 
  app.route("/inventorywithsingleproductandsinglestore/:user/:store/:productid").get(userHandlers.loginRequired,stores.inventorywithsingleproductandsinglestore);
  app.route("/inventorywithsinglestoreandallproducts/:user/:store").get(userHandlers.loginRequired,stores.inventorywithsinglestoreandallproducts);
  app.route("/inventorywithallproductandallstores/:user").get(userHandlers.loginRequired,stores.inventorywithallproductandallstores);
  app.route("/detailssumproducts/:user/:productid").get(userHandlers.loginRequired,stores.detailssumproducts);
  /// reports store actions
  app.route("/storeaction/:user/:store/:fromdate/:todate").get(userHandlers.loginRequired,storeaction.storeactions);
  /// reports clients
  app.route("/clientsonitinerary/:user/:itinerary").get(userHandlers.loginRequired,clients.clientwithitinerary);
  app.route("/paymentwithclientanddate/:client/:from/:to").get(userHandlers.loginRequired,paymentfromclients.paymentwithclientanddate);
  app.route("/discountswithclientanddate/:client/:from/:to").get(userHandlers.loginRequired,paymentfromclients.discountswithclientanddate);
  ////reports expenses
  app.route("/expenseswithcatanddate/:user/:cat/:fromdate/:todate").get(userHandlers.loginRequired,expenses.expenseswithcatanddate);
  ///reports paymenttosuppliersanddate
  app.route("/paymenttosuppliersanddate/:supplier/:from/:to").get(userHandlers.loginRequired,paymenttosuppliers.paymenttosuppliersanddate);
  /// reports buy bills
  app.route("/getbuybillswithsupplieranddate/:user/:supplier/:from/:to").get(userHandlers.loginRequired,buyfromsuppliers.getbuybillswithsupplieranddate);
  /// reports buy bills
  app.route("/getrebackbuybillswithsupplieranddate/:user/:supplier/:from/:to").get(userHandlers.loginRequired,buyfromsuppliers.getrebackbuybillswithsupplieranddate);
  // reports sell to clients
  app.route("/getsellbillswithallclientssanddate/:user/:from/:to").get(userHandlers.loginRequired,selltoclients.getsellbillswithallclientssanddate);
  app.route("/getsellbillswithallclientsandallsalesanddate/:user/:from/:to").get(userHandlers.loginRequired,selltoclients.getsellbillswithallclientsandallsalesanddate);
  app.route("/getsellbillswithallclientsandstoreanddate/:user/:from/:to").get(userHandlers.loginRequired,selltoclients.getsellbillswithallclientsandstoreanddate);
  app.route("/getsellbillswithoneclientandonesalesanddate/:user/:sales/:client/:from/:to").get(userHandlers.loginRequired,selltoclients.getsellbillswithoneclientandonesalesanddate);
  app.route("/getsellbillswithoneclientandallstoreanddate/:user/:client/:from/:to").get(userHandlers.loginRequired,selltoclients.getsellbillswithoneclientandallstoreanddate);
  /////

  app.route("/getsellbillswithoneclientandallsalesanddate/:user/:client/:from/:to").get(userHandlers.loginRequired,selltoclients.getsellbillswithoneclientandallsalesanddate);

  app.route("/getsellbillswithoneclientandallanddate/:user/:client/:from/:to").get(userHandlers.loginRequired,selltoclients.getsellbillswithoneclientandallanddate);

  app.route("/getsellbillswitallclientandonesalesanddate/:user/:sales/:from/:to").get(userHandlers.loginRequired,selltoclients.getsellbillswitallclientandonesalesanddate);
/////
  app.route("/getrebacksellbillswithclientanddate/:user/:client/:from/:to").get(userHandlers.loginRequired,selltoclients.getrebacksellbillswithclientanddate);
  ///reports checks
  app.route("/getallcheckforallclientsandalltreasury/:user/:status").get(userHandlers.loginRequired,checks.getallcheckforallclientsandalltreasury);
  app.route("/getallcheckforclientsandalltreasury/:user/:status/:client").get(userHandlers.loginRequired,checks.getallcheckforclientsandalltreasury);
  app.route("/getallcheckforclientsandtreasury/:user/:status/:client/:treasury").get(userHandlers.loginRequired,checks.getallcheckforclientsandtreasury);
  app.route("/getallcheckforallclientsandtreasury/:user/:status/:treasury").get(userHandlers.loginRequired,checks.getallcheckforallclientsandtreasury);
  ///treasury action
  app.route("/treasuryaction/:user/:treasury/:fromdate/:todate").get(userHandlers.loginRequired,treasuryaction.treasuryactions);
  // clientsactions
  app.route("/clientactions/:user/:client/:fromdate/:todate").get(userHandlers.loginRequired,clientactions.clientsactions);
  //product action
  app.route("/productaction/:user/:productid/:fromdate/:todate").get(userHandlers.loginRequired,productaction.productaction);
};
