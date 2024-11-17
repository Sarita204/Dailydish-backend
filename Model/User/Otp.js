const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
    {
       otp: {
        type: Number,
        required: true,
        maxlength: 6,
       }, 
       Mobile: {
        type: Number,
        required: true,
        trim: true,
        index: { unique :true},
        match: /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/,
      },
      type: {
        type: String,
        // required: true,
        // maxlength: 50,
      },
      expire_at: {type: Date, 
        default: Date.now, 
         expires: 300, 
      },     
    },
    { timestamps: true }
);

const otpModel = mongoose.model("otp", otpSchema);
module.exports = otpModel;