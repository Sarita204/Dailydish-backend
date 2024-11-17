const express = require("express");
const router = express.Router();
const Restocontroller = require("../../Controller/Admin/Addproduct");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Public/Products");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
router.post("/addFoodItem",upload.any(), Restocontroller.addFoodItem);
router.put("/updateFoodItem", Restocontroller.updateFoodItem);
router.get("/getFoodItems", Restocontroller.getFoodItems);
router.delete("/deleteFoodItem/:id", Restocontroller.deleteFoodItem);

router.delete("/deleteFoodItemImage", Restocontroller.deleteFoodItemImage);
router.put("/updateFoodItemImage",upload.any(), Restocontroller.updateFoodItemImage);
router.put("/addFoodItemnewImage",upload.any(), Restocontroller.addFoodItemnewImage);

router.put("/toggleFoodItemStatus/:id", Restocontroller.toggleFoodItemStatus);
router.put("/toggleFoodItemApproval/:id", Restocontroller.toggleFoodItemApproval);

module.exports = router;