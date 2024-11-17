const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const Address = new Schema({

  Address: {
    type: String,
  },
  Addresstype: {
    type: String,
  },
  userId: {
    type: String,
  },
},{ timestamps: true });

const userAddressadd = mongoose.model("Address", Address);
module.exports = userAddressadd;
