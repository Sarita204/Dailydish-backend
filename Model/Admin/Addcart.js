const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const CartSchema = new Schema(
  {
    userId: {
      type: ObjectId,
      ref: "Customer", // Assuming you have a Customer model
      required: true,
    },
   foodItemId: {
    type: String,
    },

    quantity: {
      type: Number,
      default: 1,
    },
    price: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("foodCart", CartSchema);
module.exports = Cart;
