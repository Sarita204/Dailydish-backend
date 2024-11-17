const express = require("express");
const router = express.Router();
const addressconntroller = require("../../Controller/Admin/Addslots");

router.post("/addslots", addressconntroller.addslots);
router.get("/getslots", addressconntroller.getslots);
router.delete("/deleteslots/:id", addressconntroller.deleteslots);
router.put("/updateslots", addressconntroller.updateslots);
module.exports = router;
