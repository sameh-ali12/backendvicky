"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ItinerariesSchema = new Schema({
  name: {
    type: String,
  },
  notes:{
    type:String
  },
  user: { type: Schema.Types.ObjectId, ref: "User" }
});
module.exports = mongoose.model("itineraries", ItinerariesSchema);
