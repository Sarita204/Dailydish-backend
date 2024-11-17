const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const customerorderSchema = new mongoose.Schema(
  {
    customerId: {
      type: ObjectId,
      ref: "customers",
      required: true,
    },

    allProduct: [
      {
        productId: {
          type: ObjectId,
          ref: "product",
          required: true,
        },
        totalPrice: {
          type: Number,
        },
        quantity: {
          type: Number,
        },
      },
    ],
    customerorderdatetime: {
      type: String,
    },
    deliverydate: {
      type: String,
    },

    paymentmethod: {
      type: String,
    },
    addresstype: {
      type: String,
    },
    payid: {
      type: String,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    number: {
      type: Number,
    },
    doorno: {
      type: String,
      required: true,
    },
    addressline: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    duedatetime: {
      type: String,
    },
    pincode: {
      type: String,
      required: true,
    },
    subTotal: {
      type: Number,
      default: 0,
    },
    allTotal: {
      type: Number,
      default: 0,
    },
    Discount: {
      type: Number,
      default: 0,
    },
    deliveryCharges: {
      type: Number,
      default: 0,
    },
    couponDiscount: {
      type: Number,
      default: 0,
    },
    couponId: {
      type: ObjectId,
      ref: "coupon",
    },
    couponPr: {
      type: Number,
      default: 0,
    },
    tax: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: "inprocess",
      enum: [
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
      ],
    },
    deliveryBoyId: {
      type: ObjectId,
      ref: "Employee", // Reference to your delivery person model
    },
    deliveryBoyName: {
      type: String,
    },
    deliveryBoyContactNumber: {
      type: String,
    },
    deliveryvehiclenumber: {
      type: String,
    },
    deliveryvehicleimage: {
      type: String,
    },
    deliveryBoyimage: {
      type: String,
    },
  },
  { timestamps: true }
);

const customerorderModel = mongoose.model("OrderList", customerorderSchema);
module.exports = customerorderModel;
