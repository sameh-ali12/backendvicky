"use strict";
var mongoose = require("mongoose"),
  TransferProductSales = mongoose.model("transfersales"),
  Sales = mongoose.model("sales");

exports.transfersales = function (req, res) {
  var transferproductsales = new TransferProductSales(req.body);
  transferproductsales.save(function (err,transfer) {
    if (err) {
      return res.status(400).send({
        message: err,
      });
    } else {

      Sales.find({ _id: req.body.fromsales }, function (err, sales) {
        if (err) {
          return res.json({ code: 21, message: err });
        } else {
          ///update from sales
          var details = sales[0].carstore;
          for (const index1 in req.body.details) {
            for (const index2 in details) {
              if (
                req.body.details[index1].productid ==
                details[index2].productid
              ) {
                if (
                  details[index2].quntity -
                    req.body.details[index1].realquntity ==
                  0
                ) {
                  details.splice(index2, 1);
                } else {
                  details[index2].quntity =
                    details[index2].quntity -
                    req.body.details[index1].realquntity;
                }
              }
            }
          }
          sales[0].carstore = details;
          Sales.findOneAndUpdate(
            { _id: sales[0]._id },
            sales[0],
            function (err, obj) {
              if (err) return err;
              else {
              }
            }
          );
        }
      });

      Sales.find({ _id:req.body.tosales}, function (err, sales) {
        if (err) {
          return res.json({ code: 21, message: err });
        } else {
       var details = sales[0].carstore;
          for (const index1 in req.body.details) {
            var flag  = false;
            for (const index2 in details) {
              if(req.body.details[index1].productid == details[index2].productid ){
                details[index2].quntity +=  req.body.details[index1].realquntity;
                flag = true
              }
        
              }
              if(flag == false){
                details.push({
                  productid: req.body.details[index1].productid,  
                  quntity:req.body.details[index1].realquntity
                })
              }
            }
            sales[0].carstore = details;
            Sales.findOneAndUpdate({ _id:sales[0]._id}, sales[0], function (err,obj){
              if(err)
              return err;
              else{
                return res.json({ code: 100, obj: transfer });
              }
            });
          }  
      });

    }
  });
}

