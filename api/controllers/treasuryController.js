"use strict";
var mongoose = require("mongoose"),
Treasury = mongoose.model("treasuries");
exports.addtreasury = function (req, res) {
  var newTreasury = new Treasury(req.body);
  newTreasury.save(function (err, treasury) {
    if (err) {
      return res.status(400).send({
        message: err,
      });
    } else {
      return res.json({ code: 100, obj: treasury });
    }
  });
};
exports.alltreasury = function (req, res) {
  Treasury.find({ user: req.params.userid }, function (err,treasury) {
    if (err) {
      return res.json({ code: 21, message: err });
    } else {
      return res.json({ code: 100, obj: treasury });
    }
  });
};
exports.deletetreasury = function (req, res) {
  Treasury.findOneAndRemove({ _id: req.params.id }, function (err, treasury) {
    if (err) {
      return res.json({ code: 21, message: err });
    } else {
      return res.json({ code: 100, obj: treasury });
    }
  });
};

exports.edittreasury = function (req,res) {
  Treasury.findOneAndUpdate({_id:req.params.id},req.body,function (err,treasury) {
    if(err){
      return res.json({code:21,message:err});
    }else{
      return res.json({code:100,obj:treasury});
    }
  }); 
}
exports.gettreasurywithid = function (req, res) {
  Treasury.find({ _id: req.params.id }, function (err,treasury) {
    if (err) {
      return res.json({ code: 21, message: err });
    } else {
      return res.json({ code: 100, obj: treasury });
    }
  });
};