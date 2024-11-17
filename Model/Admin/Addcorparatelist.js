const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const Addcorporateaddress = new Schema({

    Apartmentname: {
        type: String,
      },
    Address: {
        type: String,
    },
    pincode: {
        type: Number,
    },

    apartmentdelivaryprice: {
        type: Number,
    },
    approximatetime: {
        type: String,
    },
    prefixcode: {
        type: String,
    },
    status: {
        type: Boolean,
        default: true,
    },
},{ timestamps: true });

const userAddcorporateaddress = mongoose.model("Addcorporateaddress", Addcorporateaddress);
module.exports = userAddcorporateaddress;
