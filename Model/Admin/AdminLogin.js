const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let RegistrationSchema = new Schema(
  {
    REmail: {
      type: String,
    },
    RPassword: {
      type: String,
    },
  },
  { timestamps: true }
);
const RegistrationModel = mongoose.model("Registration", RegistrationSchema);
module.exports = RegistrationModel;
