"use strict";
var mongoose = require("mongoose"),
  Itineraries = mongoose.model("itineraries");
exports.additineraries = function (req, res) {
  var newItineraries = new Itineraries(req.body);
  newItineraries.save(function (err,itineraries) {
    if (err) {
      return res.status(400).send({
        message: err,
      });
    } else {
      return res.json({ code: 100, obj: itineraries });
    }
  });
};
exports.allitineraries = function (req, res) {
  Itineraries.find({ user: req.params.userid }, function (err, itineraries) {
    if (err) {
      return res.json({ code: 21, message: err });
    } else {
      return res.json({ code: 100, obj: itineraries });
    }
  });
};
exports.deleteitineraries = function (req, res) {
  Itineraries.findOneAndRemove({ _id: req.params.id }, function (err, itineraries) {
    if (err) {
      return res.json({ code: 21, message: err });
    } else {
      return res.json({ code: 100, obj: itineraries });
    }
  });
};

exports.edititinerary = function (req, res) {
  Itineraries.findOneAndUpdate({_id:req.params.id},req.body, function (err,Itinerary) {
    if (err) {
      return res.json({ code: 21, message: err });
    } else {
      return res.json({code:100,obj:Itinerary});
    }
  });
};