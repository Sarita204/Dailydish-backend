const express = require("express");
const router = express.Router();
const CutomerController = require("../../Controller/User/Userlist");
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "Public/Customer");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: storage });


router.post("/Sendotp", CutomerController.loginWithOtp);
router.post("/mobileotpverification", CutomerController.otpVarification);

router.post("/registercustomer", CutomerController.AddCustomer)
router.post("/logincustomer", CutomerController.loginCustomer)
router.post("/sendmail", CutomerController.sendMail)
router.post("/otpverification", CutomerController.Otpverification)
router.put('/newpassword', CutomerController.NewPassword)
router.put('/updateuser', upload.any(), CutomerController.updatedUser)
router.put('/profileimg', upload.any(), CutomerController.profileimg)
router.get("/registeruser", CutomerController.getRegisterUser)
router.put("/blockuser/:id", CutomerController.BlockUser);


module.exports = router;
