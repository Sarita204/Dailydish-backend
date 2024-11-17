const DelivarychargeController = require("../../Controller/Admin/DelivaryCharge");
const express = require("express");
const router = express.Router();
const multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Public/Contactus");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});
const upload = multer({ storage: storage });
router.post("/delivarycharge", upload.any(), DelivarychargeController.delivarycharge);
router.get("/getdelivarycharge", DelivarychargeController.getdelivarycharge);
router.delete("/Deletedelivarycharge/:Id", DelivarychargeController.Deletedelivarycharge);
router.put("/editdelivarycharge", upload.any(),DelivarychargeController.editdelivarycharge);
module.exports = router;
