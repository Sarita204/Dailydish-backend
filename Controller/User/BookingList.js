const transactionModel = require("../../Model/User/BookingList");
const orderModel = require("../../Model/User/BookingList");
const mongoose = require("mongoose");
const ProductModel = require("../../Model/User/BookingList");
const { ObjectId } = mongoose.Types.ObjectId;
const axios = require("axios");

class Order {
  //without otp
  async addorders(req, res) {
    let {
      customerId,
      orderdatetime,
      total,
      quantity,
      paymentmethod,
      addresstype,
      doorno,
      addressline,
      area,
      city,
      state,
      deliveryCharges,
      promodiscount,
      country,
      pincode,
      duedatetime,
      name,
      number,
      email,
      allProduct,
      payid,
      couponDiscount,
      couponId,
      Discount,
      allTotal,
      subTotal,
      couponPr,
      tax,
      deliverydate,
    } = req.body;
    // console.log("check",allProduct);

    try {
      let data = await orderModel.create({
        customerId,
        orderdatetime,
        total,
        quantity,
        paymentmethod,
        addresstype,
        doorno,
        addressline,
        area,
        city,
        state,
        deliveryCharges,
        promodiscount,
        country,
        pincode,
        duedatetime,
        name,
        number,
        email,
        allProduct,
        payid,
        Discount,
        allTotal,
        subTotal,
        couponDiscount,
        couponId,
        couponPr,
        tax,
        deliverydate,
        type: "customer",
      });
      if (data) {
        let product = data.allProduct;
        // console.log("data",product);
        for (let i = 0; i < product.length; i++) {
          let products = await ProductModel.findById(product[i].productId);
          // console.log("products",products);
          if (products) {
            await ProductModel.findOneAndUpdate(
              { _id: products._id },
              {
                remainingstock:
                  parseInt(products.remainingstock) -
                  parseInt(product[i].quantity),
                bestDeal:
                  parseInt(products.bestDeal) + parseInt(product[i].quantity),
              }
            );
          }
        }
      } else {
        return res.status(400).json({ error: "Something went wrong" });
      }
      return res.status(200).json({ success: "order create successfully" });
    } catch (err) {
      console.log(err);
    }
  }
  async assigndelivaryboy(req, res) {
    const orderId = req.params.id;
    const {
      deliveryBoyId,
      deliveryBoyName,
      deliveryBoyContactNumber,
      deliveryvehiclenumber,
      deliveryBoyimage,
      deliveryvehicleimage,
    } = req.body;

    try {
      // Find the order by orderId
      const order = await orderModel.findOne({ _id: orderId });

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      const updateOrder = await orderModel.updateOne(
        { _id: orderId },
        {
          $set: {
            deliveryBoyId: deliveryBoyId,
            deliveryBoyName: deliveryBoyName,
            deliveryBoyContactNumber: deliveryBoyContactNumber,
            deliveryvehiclenumber: deliveryvehiclenumber,
            deliveryBoyimage: deliveryBoyimage,
            deliveryvehicleimage: deliveryvehicleimage,
            status: "Assigntodelivaryboy",
          },
        }
      );

      if (updateOrder.acknowledged && updateOrder.modifiedCount > 0) {
        return res
          .status(200)
          .json({ message: "Delivery person assigned successfully", order });
      }
      return res.status(400).json({ message: "Not updated!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  async updateOrderStatus(req, res) {
    try {
      const { id } = req.params; // Order ID
      const { newStatus } = req.body; // New status from request body

      // Validate status
      const validStatuses = [
        "inprocess",
        "outfordelivery",
        "Assigntodelivaryboy",
        "Accepteddelivaryboy",
        "Rejecteddelivaryboy",
        "pickup",
        "delivered",
        "cancelled",
        "undelivered",
        "returned",
      ];
      if (!validStatuses.includes(newStatus)) {
        return res.status(400).json({ message: "Invalid status" });
      }

      // Find the order by ID
      const order = await orderModel.findById({ _id: id });
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      // Update the status
      order.status = newStatus;

      // Save the updated order
      await order.save();

      // Respond with the updated order details
      res.status(200).json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
  async getOrders(req, res) {
    const customerId = req.params.id; // Get customerId from route parameters

    try {
      // Ensure customerId is provided
      if (!customerId) {
        return res.status(400).json({ error: "customerId is required" });
      }

      // Fetch all orders for the specific customerId
      const orders = await orderModel
        .find({ customerId: new mongoose.Types.ObjectId(customerId) })
        .sort({ createdAt: -1 }) // Sort by most recent orders
        .populate("allProduct.productId"); // Populate the nested productId in allProduct array

      // If no orders are found, return a 404 error
      if (!orders || orders.length === 0) {
        return res
          .status(404)
          .json({ error: "No orders found for this customer" });
      }

      // Return the fetched orders
      return res.status(200).json({ orders });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
  async getallcustomerOrders(req, res) {
    try {
      // Fetch all orders for the specific customerId
      const orders = await orderModel
        .find({})
        .sort({ createdAt: -1 }) // Sort by most recent orders
        .populate("allProduct.productId"); // Populate the nested productId in allProduct array

      // If no orders are found, return a 404 error
      if (!orders || orders.length === 0) {
        return res
          .status(404)
          .json({ error: "No orders found for this customer" });
      }

      // Return the fetched orders
      return res.status(200).json({ orders });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
  async postdeleteorder(req, res) {
    let orderid = req.params.id;
    try {
      const data = await orderModel.findOneAndDelete({ _id: orderid });
      if (!data) {
        return res.status(403).json({
          error: "Cannot able to find the order",
        });
      } else {
        return res.json({ success: "Deleted Successfully" });
      }
    } catch (err) {
      console.log(err);
    }
  }
  //withotp
  async postaddorder(req, res) {
    let data = req.body[0];
    console.log(data);
    try {
      data.map(async (datas) => {
        let neworder = new orderModel({
          customerId: datas.customerId,
          vendorId: datas.vendorId,
          adminId: datas.adminId,
          retailerId: datas.retailerId,
          productId: datas.productId,
          orderdatetime: datas.orderdatetime,
          total: datas.total,
          quantity: datas.quantity,
          payid: datas.payid,
          paymentmethod: datas.paymentmethod,
          addresstype: datas.addresstype,
          apartmentname: datas.apartmentname,
          doorno: datas.doorno,
          addressline: datas.addressline,
          area: datas.area,
          city: datas.city,
          state: datas.state,
          country: datas.country,
          pincode: datas.pincode,
          duedatetime: datas.duedatetime,
          customername: datas.customername,
          customeremail: datas.customeremail,
          phonenumber: datas.phonenumber,
          type: "customer",
        });
        neworder
          .save()
          .then((orderdata) => {
            axios
              .get(
                "http://byebyesms.com/app/smsapi/index.php?key=26225A17F7FBDA&campaign=10458&routeid=7&type=text&contacts=" +
                  datas.phonenumber +
                  "&senderid=PARNET&msg= Your order Has been Placed Successfully " +
                  orderdata._id
              )
              .then(async (data) => {
                console.log(`statusCode: ${orderdata.statusCode}`);
                if (datas.paymentmethod === "online") {
                  let transorderdetail = new transactionModel({
                    customerId: datas.customerId,
                    paymentId: datas.paymentId,
                    payid: datas.payid,
                    orderId: neworder._id,
                    amount: datas.total,
                    customername: datas.customername,
                    customernumber: datas.phonenumber,
                    customeremail: datas.email,
                    type: "customer",
                  });
                  // const response = await razorpay.transactionModel.create(transorderdetail);
                  // console.log(amount);
                  transorderdetail.save();
                }
                let product = await ProductModel.findOne({
                  _id: datas.productId,
                });

                await ProductModel.findOneAndUpdate(
                  { _id: datas.productId },
                  {
                    remainingstock:
                      parseInt(product.totalstock) - parseInt(datas.quantity),
                  }
                );

                console.log(
                  parseInt(product.totalstock) - parseInt(datas.quantity),
                  product
                );
                return res.json({
                  success: "Order Placed successfully",
                  data: neworder,
                });
              })
              .catch((error) => {
                console.error(error);
                return res.status(500).json({ error: error });
              });
          })
          .catch((err) => console.log(err));
      });
    } catch (err) {
      console.log(err);
    }
  }

  async getvendororders(req, res) {
    let vendorId = req.params.id;

    try {
      let inprocessorders = await orderModel.aggregate([
        {
          $lookup: {
            from: "customeraddresses",
            localField: "customeraddressId",
            foreignField: "_id",
            as: "address",
          },
        },
        {
          $lookup: {
            from: "customers",
            localField: "customerId",
            foreignField: "_id",
            as: "customer",
          },
        },
        {
          $lookup: {
            from: "vendorproducts",
            localField: "productId",
            foreignField: "_id",
            as: "product",
          },
        },
        {
          $match: {
            status: "inprocess",
          },
        },
        {
          $match: {
            vendorId: new ObjectId(vendorId),
          },
        },
        {
          $sort: {
            _id: -1,
          },
        },
      ]);

      let outfordeliveryorders = await orderModel.aggregate([
        {
          $lookup: {
            from: "customeraddresses",
            localField: "customeraddressId",
            foreignField: "_id",
            as: "address",
          },
        },
        {
          $lookup: {
            from: "customers",
            localField: "customerId",
            foreignField: "_id",
            as: "customer",
          },
        },
        {
          $lookup: {
            from: "vendorproducts",
            localField: "productId",
            foreignField: "_id",
            as: "product",
          },
        },
        {
          $match: {
            status: "outfordelivery",
          },
        },
        {
          $match: {
            vendorId: new ObjectId(vendorId),
          },
        },
        {
          $sort: {
            _id: -1,
          },
        },
      ]);

      let deliveredorders = await orderModel.aggregate([
        {
          $lookup: {
            from: "customeraddresses",
            localField: "customeraddressId",
            foreignField: "_id",
            as: "address",
          },
        },
        {
          $lookup: {
            from: "customers",
            localField: "customerId",
            foreignField: "_id",
            as: "customer",
          },
        },
        {
          $lookup: {
            from: "vendorproducts",
            localField: "productId",
            foreignField: "_id",
            as: "product",
          },
        },
        {
          $match: {
            status: "delivered",
          },
        },
        {
          $match: {
            vendorId: new ObjectId(vendorId),
          },
        },
        {
          $sort: {
            _id: -1,
          },
        },
      ]);

      let cancelledorders = await orderModel.aggregate([
        {
          $lookup: {
            from: "customeraddresses",
            localField: "customeraddressId",
            foreignField: "_id",
            as: "address",
          },
        },
        {
          $lookup: {
            from: "customers",
            localField: "customerId",
            foreignField: "_id",
            as: "customer",
          },
        },
        {
          $lookup: {
            from: "vendorproducts",
            localField: "productId",
            foreignField: "_id",
            as: "product",
          },
        },
        {
          $match: {
            status: "cancelled",
          },
        },
        {
          $match: {
            vendorId: new ObjectId(vendorId),
          },
        },
        {
          $sort: {
            _id: -1,
          },
        },
      ]);

      if (
        inprocessorders ||
        outfordeliveryorders ||
        deliveredorders ||
        cancelledorders
      ) {
        return res.send({
          inprocessorders: inprocessorders,
          outfordeliveryorders: outfordeliveryorders,
          deliveredorders: deliveredorders,
          cancelledorders: cancelledorders,
        });
      } else {
        return res.status(404).json({ error: "orders didn't exist" });
      }
    } catch (error) {
      console.log(error);
      return res.status(404).json({ error: "Something went wrong" });
    }
  }

  async postconfrimedorder(req, res) {
    let orderid = req.params.id;
    try {
      const data = await orderModel.findOneAndUpdate(
        { _id: orderid },
        { status: "outfordelivery" }
      );
      if (!data) {
        return res.status(403).json({
          error: "Cannot able to find the order",
        });
      } else {
        return res.json({ success: "Accepted Successfully" });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async postcancelorder(req, res) {
    let orderid = req.params.id;
    try {
      const data = await orderModel.findOneAndUpdate(
        { _id: orderid },
        {
          status: "cancelled",
          canceldatetime: new Date(),
        }
      );
      if (!data) {
        return res.status(403).json({
          error: "Cannot able to find the order",
        });
      } else {
        return res.json({ success: "cancelled Successful" });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async postdeliveredorder(req, res) {
    let orderid = req.params.id;
    try {
      const data = await orderModel.findOneAndUpdate(
        { _id: orderid },
        { status: "delivered" }
      );
      if (!data) {
        return res.status(403).json({
          error: "Cannot able to find the order",
        });
      } else {
        return res.json({ success: "delivered Successful" });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getcustomerorders(req, res) {
    let customerId = req.params.id;

    try {
      let allorders = await orderModel.aggregate([
        {
          $lookup: {
            from: "customers",
            localField: "customerId",
            foreignField: "_id",
            as: "customers",
          },
        },
        {
          $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "_id",
            as: "products",
          },
        },
        {
          $match: {
            type: "customer",
          },
        },
        {
          $match: {
            customerId: new ObjectId(customerId),
          },
        },
        {
          $sort: {
            _id: -1,
          },
        },
      ]);

      if (allorders) {
        return res.json({ orders: allorders });
      }
      let inprocessorders = await orderModel.aggregate([
        {
          $lookup: {
            from: "customeraddresses",
            localField: "customeraddressId",
            foreignField: "_id",
            as: "address",
          },
        },
        {
          $lookup: {
            from: "customers",
            localField: "customerId",
            foreignField: "_id",
            as: "customer",
          },
        },
        {
          $lookup: {
            from: "retailers",
            localField: "retailerId",
            foreignField: "_id",
            as: "retailers",
          },
        },
        {
          $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "_id",
            as: "product",
          },
        },
        {
          $lookup: {
            from: "admins",
            localField: "adminId",
            foreignField: "_id",
            as: "admin",
          },
        },
        {
          $lookup: {
            from: "vendors",
            localField: "vendorId",
            foreignField: "_id",
            as: "vendor",
          },
        },
        {
          $match: {
            status: "inprocess",
          },
        },
        {
          $match: {
            customerId: new ObjectId(customerId),
          },
        },
        {
          $sort: {
            _id: -1,
          },
        },
      ]);

      let outfordeliveryorders = await orderModel.aggregate([
        {
          $lookup: {
            from: "customeraddresses",
            localField: "customeraddressId",
            foreignField: "_id",
            as: "address",
          },
        },
        {
          $lookup: {
            from: "retailers",
            localField: "retailerId",
            foreignField: "_id",
            as: "retailers",
          },
        },
        {
          $lookup: {
            from: "customers",
            localField: "customerId",
            foreignField: "_id",
            as: "customer",
          },
        },
        {
          $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "_id",
            as: "product",
          },
        },
        {
          $lookup: {
            from: "admins",
            localField: "adminId",
            foreignField: "_id",
            as: "admin",
          },
        },
        {
          $lookup: {
            from: "vendors",
            localField: "vendorId",
            foreignField: "_id",
            as: "vendor",
          },
        },
        {
          $match: {
            status: "outfordelivery",
          },
        },
        {
          $match: {
            customerId: new ObjectId(customerId),
          },
        },
        {
          $sort: {
            _id: -1,
          },
        },
      ]);

      let deliveredorders = await orderModel.aggregate([
        {
          $lookup: {
            from: "customeraddresses",
            localField: "customeraddressId",
            foreignField: "_id",
            as: "address",
          },
        },
        {
          $lookup: {
            from: "retailers",
            localField: "retailerId",
            foreignField: "_id",
            as: "retailers",
          },
        },
        {
          $lookup: {
            from: "customers",
            localField: "customerId",
            foreignField: "_id",
            as: "customer",
          },
        },
        {
          $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "_id",
            as: "product",
          },
        },
        {
          $lookup: {
            from: "admins",
            localField: "adminId",
            foreignField: "_id",
            as: "admin",
          },
        },
        {
          $lookup: {
            from: "vendors",
            localField: "vendorId",
            foreignField: "_id",
            as: "vendor",
          },
        },
        {
          $match: {
            status: "delivered",
          },
        },
        {
          $match: {
            customerId: new ObjectId(customerId),
          },
        },
        {
          $sort: {
            _id: -1,
          },
        },
      ]);

      let cancelledorders = await orderModel.aggregate([
        {
          $lookup: {
            from: "customeraddresses",
            localField: "customeraddressId",
            foreignField: "_id",
            as: "address",
          },
        },
        {
          $lookup: {
            from: "retailers",
            localField: "retailerId",
            foreignField: "_id",
            as: "retailers",
          },
        },
        {
          $lookup: {
            from: "customers",
            localField: "customerId",
            foreignField: "_id",
            as: "customer",
          },
        },
        {
          $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "_id",
            as: "product",
          },
        },
        {
          $lookup: {
            from: "admins",
            localField: "adminId",
            foreignField: "_id",
            as: "admin",
          },
        },
        {
          $lookup: {
            from: "vendors",
            localField: "vendorId",
            foreignField: "_id",
            as: "vendor",
          },
        },
        {
          $match: {
            status: "cancelled",
          },
        },
        {
          $match: {
            customerId: new ObjectId(customerId),
          },
        },
        {
          $sort: {
            _id: -1,
          },
        },
      ]);
    } catch (error) {
      console.log(error);
      return res.status(404).json({ error: "Something went wrong" });
    }
  }

  async getinprocessorders(req, res) {
    try {
      let inprocessorders = await orderModel.aggregate([
        {
          $lookup: {
            from: "customeraddresses",
            localField: "customeraddressId",
            foreignField: "_id",
            as: "address",
          },
        },
        {
          $lookup: {
            from: "customers",
            localField: "customerId",
            foreignField: "_id",
            as: "customer",
          },
        },
        {
          $lookup: {
            from: "vendorproducts",
            localField: "productId",
            foreignField: "_id",
            as: "product",
          },
        },
        {
          $lookup: {
            from: "vendordetails",
            localField: "vendorId",
            foreignField: "vendorId",
            as: "vendor",
          },
        },
        {
          $match: {
            status: "inprocess",
          },
        },
        {
          $sort: {
            _id: -1,
          },
        },
      ]);
      if (inprocessorders) {
        return res.send({ inprocessorders: inprocessorders });
      } else {
        return res.status(404).json({ error: "orders didn't exist" });
      }
    } catch (error) {
      console.log(error);
      return res.status(404).json({ error: "Something went wrong" });
    }
  }

  async getoutfordeliveryorders(req, res) {
    try {
      let outfordeliveryorders = await orderModel.aggregate([
        {
          $lookup: {
            from: "customeraddresses",
            localField: "customeraddressId",
            foreignField: "_id",
            as: "address",
          },
        },
        {
          $lookup: {
            from: "customers",
            localField: "customerId",
            foreignField: "_id",
            as: "customer",
          },
        },
        {
          $lookup: {
            from: "vendorproducts",
            localField: "productId",
            foreignField: "_id",
            as: "product",
          },
        },
        {
          $lookup: {
            from: "vendordetails",
            localField: "vendorId",
            foreignField: "vendorId",
            as: "vendor",
          },
        },
        {
          $match: {
            status: "outfordelivery",
          },
        },
        {
          $sort: {
            _id: -1,
          },
        },
      ]);
      if (outfordeliveryorders) {
        return res.send({ outfordeliveryorders: outfordeliveryorders });
      } else {
        return res.status(404).json({ error: "orders didn't exist" });
      }
    } catch (error) {
      console.log(error);
      return res.status(404).json({ error: "Something went wrong" });
    }
  }

  async getdeliveredorders(req, res) {
    try {
      let deliveredorders = await orderModel.aggregate([
        {
          $lookup: {
            from: "customeraddresses",
            localField: "customeraddressId",
            foreignField: "_id",
            as: "address",
          },
        },
        {
          $lookup: {
            from: "customers",
            localField: "customerId",
            foreignField: "_id",
            as: "customer",
          },
        },
        {
          $lookup: {
            from: "vendorproducts",
            localField: "productId",
            foreignField: "_id",
            as: "product",
          },
        },
        {
          $lookup: {
            from: "vendordetails",
            localField: "vendorId",
            foreignField: "vendorId",
            as: "vendor",
          },
        },
        {
          $match: {
            status: "delivered",
          },
        },
        {
          $sort: {
            _id: -1,
          },
        },
      ]);
      if (deliveredorders) {
        return res.send({ deliveredorders: deliveredorders });
      } else {
        return res.status(404).json({ error: "orders didn't exist" });
      }
    } catch (error) {
      console.log(error);
      return res.status(404).json({ error: "Something went wrong" });
    }
  }

  async getcancelledorders(req, res) {
    try {
      let cancelledorders = await orderModel.aggregate([
        {
          $lookup: {
            from: "customeraddresses",
            localField: "customeraddressId",
            foreignField: "_id",
            as: "address",
          },
        },
        {
          $lookup: {
            from: "customers",
            localField: "customerId",
            foreignField: "_id",
            as: "customer",
          },
        },
        {
          $lookup: {
            from: "vendorproducts",
            localField: "productId",
            foreignField: "_id",
            as: "product",
          },
        },
        {
          $lookup: {
            from: "vendordetails",
            localField: "vendorId",
            foreignField: "vendorId",
            as: "vendor",
          },
        },
        {
          $match: {
            status: "cancelled",
          },
        },
        {
          $sort: {
            _id: -1,
          },
        },
      ]);
      if (cancelledorders) {
        return res.send({ cancelledorders: cancelledorders });
      } else {
        return res.status(404).json({ error: "orders didn't exist" });
      }
    } catch (error) {
      console.log(error);
      return res.status(404).json({ error: "Something went wrong" });
    }
  }

  async getallcustomerorder(req, res) {
    let allorders = await orderModel.aggregate([
      {
        $lookup: {
          from: "customers",
          localField: "customerId",
          foreignField: "_id",
          as: "customers",
        },
      },
      {
        $lookup: {
          from: "retailers",
          localField: "retailerId",
          foreignField: "_id",
          as: "retailers",
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "products",
        },
      },
      {
        $match: {
          type: "customer",
        },
      },
    ]);

    if (allorders) {
      return res.json({ orders: allorders });
    }
  }
  async postdeleteorder(req, res) {
    let orderid = req.params.id;
    try {
      const data = await orderModel.findOneAndDelete({ _id: orderid });
      if (!data) {
        return res.status(403).json({
          error: "Cannot able to find the order",
        });
      } else {
        return res.json({ success: "Deleted Successfully" });
      }
    } catch (err) {
      console.log(err);
    }
  }
}

const customerorderController = new Order();
module.exports = customerorderController;
