const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let LivestreamSchema = new Schema(
  {
    LivestreamTitle: {
      type: String,
    },
    Livestream: {
      type: String,
    },
  },
  { timestamps: true }
);
const LivestreamModel = mongoose.model("Livestream", LivestreamSchema);
module.exports = LivestreamModel;
