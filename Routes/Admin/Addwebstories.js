const storiescontroller = require("../../Controller/Admin/Addwebstories");
const express = require("express");
const router = express.Router();
const multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Public/Webstories");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});
const upload = multer({ storage: storage });
router.post("/Addstories", upload.any(), storiescontroller.Addstories);
router.get("/getstories", upload.any(), storiescontroller.getstories);
router.delete("/Deletestories/:Id", storiescontroller.Deletestories);
router.put("/editstories", upload.any(),storiescontroller.editstories);
module.exports = router;
