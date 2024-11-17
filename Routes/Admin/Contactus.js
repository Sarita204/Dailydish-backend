const contactusController = require("../../Controller/Admin/Contactus");
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
router.post("/contactus", upload.any(), contactusController.contactus);
router.get("/getcontactus", contactusController.getcontactus);
router.delete("/Deletecontactus/:Id", contactusController.Deletecontactus);
router.put("/editcontactus", upload.any(),contactusController.editcontactus);
module.exports = router;
