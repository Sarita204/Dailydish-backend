const path = require("path");
const AddRestaurants = require("../../Model/Admin/Addproduct");
class AddRestaurantdata {
  async addFoodItem(req, res) {
    const {
      foodname,
      foodcategory,
      fooddescription,
      foodprice,
      foodmealtype,
      recommended,
      approved,
      blocked,
      totalstock,
      Remainingstock,
      gst,
      discount,
      offerprice,
      totalprice,
      unit,
      quantity,
      loaddate,
      loadtime,
    } = req.body;

    let Foodgallery = [];

    // Check if files are uploaded and process them for Foodgallery
    if (req.files && req.files.length > 0) {
      req.files.forEach(file => {
        if (file.fieldname.startsWith("Foodgallery")) {
          Foodgallery.push({ image2: file.filename });
        }
      });
    }

    try {
      // Create new food item instance
      const foodItem = new AddRestaurants({
        foodname,
        foodcategory,
        fooddescription,
        foodprice,
        foodmealtype,
        recommended,
        approved,
        blocked,
        totalstock,
        Remainingstock,
        gst,
        discount,
        offerprice,
        totalprice,
        unit,
        quantity,
        loaddate,
        loadtime,
        Foodgallery,  // Add gallery images
      });

      // Save the new food item in the database
      const savedFoodItem = await foodItem.save();

      return res.status(200).json({
        message: "Food item added successfully!",
        data: savedFoodItem,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error adding food item",
        error: error.message,
      });
    }
  }

  async updateFoodItem(req, res) {
    try {
      const {
        foodname,
        foodcategory,
        fooddescription,
        foodprice,
        foodmealtype,
        recommended,
        approved,
        blocked,
        totalstock,
        Remainingstock,
        gst,
        discount,
        offerprice,
        totalprice,
        unit,
        quantity,
        loaddate,
        loadtime,
        userid
      } = req.body;
      if (!userid) {
        return res.status(400).json({ error: "User ID is required" });
      }
 
      // Object to hold update fields
      let obj = {};
 
      // Dynamically add fields to the update object if they are provided
      if (foodname) obj["foodname"] = foodname;
      if (foodcategory) obj["foodcategory"] = foodcategory;
      if (fooddescription) obj["fooddescription"] = fooddescription;
      if (foodprice) obj["foodprice"] = foodprice;
      if (foodmealtype) obj["foodmealtype"] = foodmealtype;
      if (typeof recommended !== "undefined") obj["recommended"] = recommended;
      if (typeof approved !== "undefined") obj["approved"] = approved;
      if (typeof blocked !== "undefined") obj["blocked"] = blocked;
      if (totalstock !== undefined) obj["totalstock"] = totalstock;
      if (Remainingstock !== undefined) obj["Remainingstock"] = Remainingstock;
      if (gst !== undefined) obj["gst"] = gst;
      if (discount !== undefined) obj["discount"] = discount;
      if (offerprice !== undefined) obj["offerprice"] = offerprice;
      if (totalprice !== undefined) obj["totalprice"] = totalprice;
      if (unit) obj["unit"] = unit;
      if (quantity) obj["quantity"] = quantity;
      if (loaddate) obj["loaddate"] = loaddate;
      if (loadtime) obj["loadtime"] = loadtime;
 
      // Find food item by ID and update
      let data = await AddRestaurants.findByIdAndUpdate(
        { _id: userid },
        { $set: obj },
        { new: true }
      );
      console.log("data", data);
 
      // If the food item is not found
      if (!data) {
        return res.status(400).json({ error: "Food item not found or update failed" });
      }
 
      // Return success response with the updated food item data
      return res.status(200).json({
        success: "Update successfully",
        userdata: data,
      });
    } catch (error) {
      console.log("Error updating food item:", error);
      return res.status(500).json({
        error: "Internal Server Error",
        details: error.message,
      });
    }
  }
 

  async getFoodItems(req, res) {
    try {
      const restaurant = await AddRestaurants.find({})

      if (!restaurant) {
        return res.status(404).json({ error: "Restaurant not found" });
      }

      return res.status(200).json({ success: "Food items retrieved successfully", data: restaurant });
    } catch (error) {
      console.error("Error retrieving food items:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async deleteFoodItem(req, res) {
    try {
      const id = req.params.id;
      console.log("id", id);
      if (!id) {
        return res.status(200).json('Data Not Found...');
      }
      await AddRestaurants.deleteOne({ _id: id })
      return res.status(200).json({ success: 'Deleted Sucessfully...' });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  };
  // Delete a food item image
  async deleteFoodItemImage(req, res) {
    try {
      const { id, packid } = req.body;

      console.log("gsd", id, packid)

      const deletegallery = await AddRestaurants.findByIdAndUpdate(
        { _id: packid },
        { $pull: { Foodgallery: { _id: id } } },
        { new: true }
      );
      if (deletegallery) {
        return res.status(200).json({ sucess: "Deleted Sucessfully", deletegallery: deletegallery });
      }
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
  async updateFoodItemImage(req, res) {
    try {
      const { galleryid, id } = req.body;
      let file = req.files ? req.files[0].filename : "";

      console.log("gggg", galleryid, id, file);
      let images = await AddRestaurants.findById(id);
      if (!images) {
        return res.status(400).json({ error: "Data not found" });
      }
      let perticulargallery = images?.Foodgallery?.id(galleryid);

      if (!perticulargallery) {
        return res.status(400).json({ error: "Image not found" });
      }
      if (file) {
        perticulargallery.image2 = file;
      }
      let updateimagedata = await images.save();
      return res.status(200).json({ msg: "Updated succcessfully", success: updateimagedata });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
  async addFoodItemnewImage(req, res) {
    try {
      const { restorentid } = req.body;
      let file = req.files[0]?.filename;
      let data = await AddRestaurants.findOneAndUpdate(
        { _id: restorentid },
        { $push: { Foodgallery: { image2: file } } }
      );
      if (data) {
        return res.status(200).json({ sucess: "Sucessfully Uploaded", updeteddata: data });
      } else {
        return res.status(400).json({ error: "Something went wrong" });
      }
    } catch (error) {
      return res.status(200).json({ error: "Internal Server Error" });
    }
  }
  async toggleFoodItemStatus(req, res) {
    const BlockId = req.params.id;
    try {
      const User = await AddRestaurants.findById({ _id: BlockId });
      if (User.blocked === false) {
        await AddRestaurants.findByIdAndUpdate(
          { _id: User._id },
          { $set: { blocked: true } },
          { new: true }
        );
        return res.status(200).json({ msg: " Unblocked " });
      } else {
        await AddRestaurants.findByIdAndUpdate(
          { _id: User._id },
          { $set: { blocked: false } },
          { new: true }
        );
        return res.status(200).json({ success: " Blocked" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async toggleFoodItemApproval(req, res) {
    const { id } = req.params; // Restaurant ID from URL params
    const { status } = req.query; // Status query parameter to determine action

    // Check if the status query parameter is valid
    if (status !== "approve" && status !== "disapprove") {
      return res.status(400).json({ error: "Invalid status parameter. Use 'approve' or 'disapprove'." });
    }

    try {
      // Determine the new approval status for the restaurant
      const isApproved = status === "approve";

      // Update the specific restaurant's 'approved' field
      const updatedRestaurant = await AddRestaurants.findByIdAndUpdate(
        id,
        { $set: { approved: isApproved } },
        { new: true, runValidators: true } // Return the updated document
      );

      if (!updatedRestaurant) {
        return res.status(404).json({ error: "Restaurant not found" });
      }

      return res.status(200).json({ success: `Restaurant ${status}d successfully`, data: updatedRestaurant });
    } catch (error) {
      console.error(`Error ${status}ing restaurant:`, error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

}

const Restocontroller = new AddRestaurantdata();
module.exports = Restocontroller;