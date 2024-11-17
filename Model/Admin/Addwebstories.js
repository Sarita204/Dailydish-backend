const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let webstories = new Schema(
  {
    StoriesImage: {
      type: String,
    },
    StoriesText: {
      type: String,
    },
  },
  { timestamps: true }
);
const webstoriesmodal = mongoose.model("webstories", webstories);
module.exports = webstoriesmodal;