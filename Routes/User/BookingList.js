const express = require("express");
const router = express.Router();
const orderController = require("../../Controller/User/BookingList");

router.post("/customer/addorders", orderController.addorders);
router.get("/customer/allorders/:id", orderController.getcustomerorders);
router.get("/customer/orders/:id", orderController.getOrders);
router.get(
  "/customer/getallcustomerOrders",
  orderController.getallcustomerOrders
);
router.get("/customer/order", orderController.getallcustomerorder);
router.post("/cancel/:id", orderController.postcancelorder);
router.put("/updatecartOrderStatus/:id", orderController.updateOrderStatus);
router.put("/assigncartdelivaryboy/:id", orderController.assigndelivaryboy);
router.delete("/deleteorder/:id", orderController.postdeleteorder);

module.exports = router;
