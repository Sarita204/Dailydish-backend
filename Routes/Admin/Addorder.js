const express=require("express");
const router=express.Router();
const CartController=require("../../Controller/Admin/Addorder");

router.post("/addfoodorder",CartController.addfoodorder);
router.get("/getfoodorder/:id",CartController.getfoodorder);
router.get("/getfoodorderId/:id",CartController.getfoodorderId);
router.get("/getallorders",CartController.getallorders);
router.put("/updateOrderStatus/:id",CartController.updateOrderStatus);
router.delete("/deletefoodorder/:id",CartController.deletefoodorder);
module.exports=router;