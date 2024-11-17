const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let SocialSchema = new Schema(
  {
    CBanner: {
        type: String,
    },
    CText: {
      type: String,
  }
  },
  { timestamps: true }
);
const SocialModel = mongoose.model("Social", SocialSchema);
module.exports = SocialModel;
