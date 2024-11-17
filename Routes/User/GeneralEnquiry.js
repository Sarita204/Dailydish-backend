
const express = require("express");
const router = express.Router();
const EnquiryController = require("../../Controller/User/GeneralEnquiry")


router.post("/EnquiryEnquiry", EnquiryController.EnquiryEnquiry)
router.get("/getEnquiryenquiry", EnquiryController.getEnquiryenquiry)
router.delete("/DeleteEnquiryList/:id", EnquiryController.DeleteEnquiryList);

module.exports = router;