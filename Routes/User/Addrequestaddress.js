const express = require("express");
const router = express.Router();
const addressconntroller = require("../../Controller/User/Addrequestaddress");

router.post("/addaddress", addressconntroller.addAddress);
router.get("/getaddress", addressconntroller.getAddress);
router.delete("/deleteAddress/:id", addressconntroller.deleteAddress);
router.put("/updatedaddress", addressconntroller.updatedaddress);
module.exports = router;
