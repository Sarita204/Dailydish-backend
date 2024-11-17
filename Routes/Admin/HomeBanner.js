const bannerController = require("../../Controller/Admin/HomeBanner");
const express = require("express");
const router = express.Router();
const multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Public/HomeBanner");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});
const upload = multer({ storage: storage });
router.post("/banner", upload.any(), bannerController.banner);
router.get("/getbanner", upload.any(), bannerController.getbanner);
router.delete("/Deletebanner/:Id", bannerController.Deletebanner);
router.put("/editbanner", upload.any(),bannerController.editbanner);
module.exports = router;
