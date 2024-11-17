const express = require("express");
const router = express.Router();
const addressconntroller = require("../../Controller/Admin/Addcorporatelist");

router.post("/addcorporate", addressconntroller.addcorporate);
router.get("/getcorporate", addressconntroller.getcorporate);
router.delete("/deletecorporate/:id", addressconntroller.deletecorporate);
router.put("/updatecorporatelist", addressconntroller.updatecorporatelist);
router.put("/corporateItemStatus", addressconntroller.corporateItemStatus);
module.exports = router;
