const express = require("express");
const router = express.Router();
const slotscontroller = require("../../Controller/Admin/Addapartmentlist");

router.post("/addapartment", slotscontroller.addapartment);
router.get("/getapartment", slotscontroller.getapartment);
router.delete("/deleteapartment/:id", slotscontroller.deleteapartment);
router.put("/updateapartment", slotscontroller.updateapartment);
router.put("/apartmentItemStatus", slotscontroller.apartmentItemStatus);
module.exports = router;
