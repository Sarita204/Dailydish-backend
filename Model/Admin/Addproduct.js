const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const AddRestaurants = new Schema(
  {
    foodname: {
      type: String,
    },
    foodcategory: {
      type: String,
    },
    fooddescription: {
      type: String,
    },
    foodprice: {
      type: String,
    },
    foodmealtype: {
      type: String,
    },
    recommended: {
      type: Boolean,
      default: false,
    },
    approved: {
      type: Boolean,
      default: false,
    },
    blocked: {
      type: Boolean,
      default: false,
    },
    totalstock: {
      type: Number,
    },
    Remainingstock: {
      type: Number,
    },
    Foodgallery: [
      {
        image2: {
          type: String,
        },
      },
    ],
    Status: {
        type: String,
          },
    gst: {
      type: Number,
    },
    discount: {
      type: Number,
    },

    offerprice: {
      type: Number,
    },
    totalprice: {
      type: Number,
    },
    unit: {
      type: String,
    },
    quantity: {
      type: String,
    },
    loaddate: {
      type: String,
    },
    loadtime: {
      type: String,
    },

  },
  { timestamps: true }
);

const AddRestaurantsmodel = mongoose.model("Fooditem", AddRestaurants);
module.exports = AddRestaurantsmodel;