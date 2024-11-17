const express = require('express')
const router = express.Router()
const RegistrationController = require("../../Controller/Admin/AdminLogin");


router.post("/Registration", RegistrationController.Registration);
router.post("/adminLogin", RegistrationController.adminLogin);
module.exports = router;