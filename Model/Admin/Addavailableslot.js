const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const Availableslots = new Schema({

    Availableslots: {
    type: String,
  },
  Mainslots: {
    type: String,
  },
  
},{ timestamps: true });

const availablecontroller = mongoose.model("Availableslots", Availableslots);
module.exports = availablecontroller;
