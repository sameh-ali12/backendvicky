"use strict";
var mongoose = require("mongoose"),
  Clients = mongoose.model("clients");
exports.addclient = function (req, res) {
  var newClients = new Clients(req.body);
  newClients.save(function (err, clients) {
    if (err) {
      return res.status(400).send({
        message: err,
      });
    } else {
      return res.json({ code: 100, obj: clients });
    }
  });
};
exports.allclient = function (req, res) {
  Clients.find({ user: req.params.userid }, function (err, clients) {
    if (err) {
      return res.json({ code: 21, message: err });
    } else {
      return res.json({ code: 100, obj: clients });
    }
  }).populate('itineraries');
};
exports.deleteclient = function (req, res) {
  Clients.findOneAndRemove({ _id: req.params.id }, function (err, client) {
    if (err) {
      return res.json({ code: 21, message: err });
    } else {
      return res.json({ code: 100, obj: client });
    }
  });
};
exports.clientwithid = function (req, res) {
  Clients.find({ _id: req.params.id }, function (err, client) {
    if (err) {
      return res.json({ code: 21, message: err });
    } else {
      return res.json({ code: 100, obj: client });
    }
  }).populate('itineraries');
};
exports.editclient = function (req, res) {
  Clients.findOneAndUpdate({_id:req.params.id},req.body, function (err,client) {
    if (err) {
      return res.json({ code: 21, message: err });
    } else {
      return res.json({code:100,obj:client});
    }
  });
};
////reports
exports.clientwithitinerary = function (req, res) {
  Clients.find({user:req.params.user,itineraries:req.params.itinerary }, function (err, clients) {
    if (err) {
      return res.json({ code: 21, message: err });
    } else {
      return res.json({ code: 100, obj: clients });
    }
  })
};



