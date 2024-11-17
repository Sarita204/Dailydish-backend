const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const Slots = new Schema({

  mainslots: {
    type: String,
  },
},{ timestamps: true });

const Addmainslots = mongoose.model("Mainslots", Slots);
module.exports = Addmainslots;
