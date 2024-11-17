const LivestreamController = require("../../Controller/Admin/Livestream");
const express = require("express");
const router = express.Router();
const multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Public/Livestream");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});
const upload = multer({ storage: storage });
router.post("/Livestream", upload.any(), LivestreamController.Livestream);
router.get("/getLivestream", LivestreamController.getLivestream);
router.delete("/DeleteLivestream/:Id", LivestreamController.DeleteLivestream);
router.put(
  "/editLivestream",
  upload.any(),
  LivestreamController.editLivestream
);
module.exports = router;
