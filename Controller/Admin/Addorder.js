const customerCartModel = require('../../Model/Admin/Addorder');
const ProductModel = require('../../Model/Admin/Addproduct');
const { default: mongoose } = require('mongoose');
const { v4: uuidv4 } = require('uuid');
class customerCart{
    
  async addfoodorder(req, res) {
    let {
      customerId,
      allProduct,
      Placedon,
      delivarylocation,
      username,
      Mobilenumber,
      paymentmethod,
      delivarytype,
      payid,
      addressline,
      subTotal,
      allTotal,
      foodtotal,
      tax,
      slot,
      ordertype,
      orderdelivarytype,
      orderId,
      orderstatus,
      approximatetime,
      Cutlery
    } = req.body;
  
    try {
      let newOrder = new customerCartModel({
        customerId,
        allProduct,
        Placedon,
        delivarylocation,
        username,
        Mobilenumber,
        paymentmethod,
        delivarytype,
        payid,
        addressline,
        subTotal,
        allTotal,
        orderstatus,
        foodtotal,
        tax,
        slot,
        ordertype,
        Cutlery,
        orderdelivarytype,
        approximatetime,
        orderId: uuidv4(),
      });
  
      if (!customerId) {
        return res.status(501).json({ error: "Please Login" });
      } else {
        await newOrder.save();
  
        // Update the stock for each product in the order
        for (let item of allProduct) {
          const product = await ProductModel.findById(item.foodItemId);
          if (product) {
            product.Remainingstock += item.quantity;
  
            // Check if Remainingstock and totalstock are equal
            if (product.Remainingstock >= product.totalstock) {
              product.blocked = true;
            }
  
            await product.save();
          }
        }
  
        return res.status(200).json({ success: "Order placed and stock updated" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
  


    async getfoodorder(req, res) {
      try {
        const { customerId } = req.params.id;
    
        // Find all orders for the given customerId
        const orders = await customerCartModel.find({ customerId }).populate("allProduct.foodItemId");
    
        if (orders.length === 0) {
          return res.status(404).json({ message: "No orders found for this customer." });
        }
    
        res.status(200).json({
          message: "Orders retrieved successfully",
          orders,
        });
      } catch (error) {
        res.status(500).json({ message: "Failed to retrieve orders", error });
      }
    }

  // Get all orders for a specific user by userId
  async getfoodorderId(req, res){
    try {
      const { orderId } = req.params;
  
      // Find the order by orderId
      const order = await customerCartModel.findOne({ orderId }).populate("allProduct.foodItemId");
  
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      res.status(200).json({
        message: "Order retrieved successfully",
        order,
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve order", error });
    }
  }

  async getallorders(req, res) {
    let order = await customerCartModel.find({}).populate("allProduct.foodItemId");;
    if (order) {
      return res.status(200).json({ order: order});
    } else {
      return res.status(500).json({ error: "something went wrong" });
    }
  }
      
  // Delete a specific order by orderId
   async deletefoodorder(req, res) {
      let orderid = req.params.id;
    
      try {
        const data = await customerCartModel.findOneAndDelete({ _id: orderid });
    
        if (!data) {
          return res.status(403).json({
            error: "Cannot find the order",
          });
        }
    
        return res.json({ success: "Deleted Successfully" });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }

    async updateOrderStatus(req, res) {
      try {
        const { id } = req.params; // Order ID
        const { newStatus, reasonforcancel } = req.body; // New status from request body
    
        // Validate status
        const validStatuses = [
          "inprocess",
          "Cooking",
          "Packing",
          "Ontheway",
          "Delivered",
          "Undelivered",
          "Returned",
          "Cancelled",
        ];
        if (!validStatuses.includes(newStatus)) {
          return res.status(400).json({ message: "Invalid status" });
        }
    
        // Find the order by ID
        const order = await customerCartModel.findById(id);
        if (!order) {
          return res.status(404).json({ message: "Order not found" });
        }
    
        // Update the status and reason for cancellation
        order.status = newStatus;
        order.reasonforcancel = reasonforcancel;
    
        // If newStatus is 'Delivered', automatically update orderstatus to 'Delivered'
        if (newStatus === "Delivered") {
          order.orderstatus = "Delivered";
        }
    
        // Save the updated order
        await order.save();
    
        // Respond with the updated order details
        res.status(200).json(order);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
      }
    }
    
    
}

const customerCartController = new customerCart();
module.exports = customerCartController;