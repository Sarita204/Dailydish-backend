const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Enquiry = new Schema(
  {
    Name: {
      type: String,
    },

    Number: {
      type: Number,
    },

    ApartmentName: {
      type: String,
    },

    Message: {
      type: String,
    },
  },
  { timestamps: true }
);
const EnquiryModal = mongoose.model("Enquiry", Enquiry);
module.exports = EnquiryModal;
