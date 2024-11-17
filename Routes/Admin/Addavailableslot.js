const express = require("express");
const router = express.Router();
const addressconntroller = require("../../Controller/Admin/Addavailableslot");

router.post("/addavailableslots", addressconntroller.addavailableslots);
router.get("/getavailableslots", addressconntroller.getavailableslots);
router.delete("/deleteavailableslots/:id", addressconntroller.deleteavailableslots);
router.put("/updateavailableslots", addressconntroller.updateavailableslots);
module.exports = router;
