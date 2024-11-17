const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const Addapartmentaddress = new Schema({

    Apartmentname: {
        type: String,
      },
    Address: {
        type: String,
    },
    pincode: {
        type: Number,
    },
    doordelivaryprice: {
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
    
} ,{ timestamps: true });

const userAddapartmentaddress = mongoose.model("Addapartmentaddress", Addapartmentaddress);
module.exports = userAddapartmentaddress;
