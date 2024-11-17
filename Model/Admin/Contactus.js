const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ContactusSchema = new Schema(
  {
    CAddress: {
        type: String,
    },

    CPhone: {
      type: String,
    },
    CEmail: {
      type: String,
    },
    
  },
  { timestamps: true }
);
const ContactusModel = mongoose.model("Contactus", ContactusSchema);
module.exports = ContactusModel;
