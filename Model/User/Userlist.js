const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Customer = new Schema(
  {
    Fname: {
      type: String,
    },

    Mobile: {
      type: Number,
    },

    Email: {
      type: String,
    },

    Flatno: {
      type: String,
    },

    otp: {
      type: Number,
    },

    Address: {
      type: String,
    },

    profileImage: {
      type: String,
    },

    BlockCustomer: {
      type: Boolean,
      default: true,
    },
    token: {
      type: String,
    },
    Nooforders: {
      type: Number,
    },
    Lastorderdate: {
      type: String,
    },
    lastorderamount: {
      type: Number,
    },
    
  },
  { timestamps: true }
);

const CustomerModel = mongoose.model("Customer", Customer);
module.exports = CustomerModel;
