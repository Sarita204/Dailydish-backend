const express=require("express");
const router=express.Router();
const CartController=require("../../Controller/Admin/Addcart");

router.post("/addToCartCustomer",CartController.addToCartCustomer);
router.get("/getAllCartProductsByCustomer/:id",CartController.getAllCartProductsByCustomer);
router.delete("/DeleteAllCartProductsByCustomer",CartController.DeleteAllCartProductsByCustomer);
router.delete("/deletefoodcart/:id",CartController.DeleteAllfoodCart);
router.put("/priceIncAnddec",CartController.priceIncAnddec);
module.exports=router;