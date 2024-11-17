const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let BannerSchema = new Schema(
  {
    BannerImage: {
      type: String,
    },
    BannerText: {
      type: String,
    },
    BannerDesc: {
        type: String,
      },
  },
  { timestamps: true }
);
const BannerModel = mongoose.model("Banner", BannerSchema);
module.exports = BannerModel;