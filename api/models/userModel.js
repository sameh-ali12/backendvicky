'use strict';

var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
  Schema = mongoose.Schema;
var role = ['admin', 'user'];

var UserSchema = new Schema({
  name:{
    type:String
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true
  },
  hash_password: {
    type: String,
    required: true
  },
  restpassword:{
    type:String,
    require:false
  },
  role: {
    type: String,
    enum: role
    },
    partners:[{
      lastliquidation:{type: Schema.Types.ObjectId, ref: "liquidations"},
    user: { type: Schema.Types.ObjectId, ref: "User" },
      value:{
        type:Number
      },
      sellbills:[{ type: Schema.Types.ObjectId, ref: "partnersells" }],
      buybills:[{ type: Schema.Types.ObjectId, ref: "partnersells" }],
      transferfromus:[{ type: Schema.Types.ObjectId, ref: "transfers" }],
      transferfromhim:[{ type: Schema.Types.ObjectId, ref: "transfers" }]
    }]
});
UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.hash_password);
};
module.exports = mongoose.model('User', UserSchema);