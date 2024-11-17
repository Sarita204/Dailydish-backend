const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let DelivarychargeSchema = new Schema(
  {
    MinimumAmount: {
        type: Number,
    },
    DelivaryCharge: {
      type: Number,
    },
  
  },
  { timestamps: true }
);
const DelivarychargeModel = mongoose.model("DelivaryCharge", DelivarychargeSchema);
module.exports = DelivarychargeModel;
