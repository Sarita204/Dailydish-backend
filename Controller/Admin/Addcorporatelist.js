const Addcorparatemodal = require("../../Model/Admin/Addcorparatelist");

class Addcorporate {
  async addcorporate(req, res) {
    let {
        Apartmentname,
      Address,
      pincode,apartmentdelivaryprice,approximatetime,prefixcode
    } = req.body;
    try {
      let Newuser = new Addcorparatemodal({
        Apartmentname,
        Address,
        pincode,apartmentdelivaryprice,approximatetime,prefixcode
      });
      if (
        !Apartmentname ||
        !Address ||
        !pincode ||
        !apartmentdelivaryprice||
        !approximatetime||
        !prefixcode
      ) {
        return res.status(501).json({ error: "Please fill all fields" });
      } else {
        Newuser.save().then((data) => {
          return res.status(200).json({ success: "Corporate Detail Added Successfully" });
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getcorporate(req, res) {
    let corporatedata = await Addcorparatemodal.find({});
    if (corporatedata) {
      return res.status(200).json({ corporatedata: corporatedata});
    } else {
      return res.status(500).json({ error: "something went wrong" });
    }
  }
  async updatecorporatelist(req, res) {
    let {
      id,
      Address,
      Apartmentname,
      pincode,
      apartmentdelivaryprice,
      approximatetime,
      prefixcode,
      status,
    } = req.body;
    let obj = {};
    if (Address) obj["Address"] = Address;
    if (Apartmentname) obj["Apartmentname"] = Apartmentname;
    if (pincode) obj["pincode"] = pincode;
    if (apartmentdelivaryprice)
      obj["apartmentdelivaryprice"] = apartmentdelivaryprice;
    if (approximatetime) obj["approximatetime"] = approximatetime;
    if (prefixcode) obj["prefixcode"] = prefixcode;
    if (status) obj["status"] = status;
    try {
      let data = await Addcorparatemodal.findByIdAndUpdate(
        { _id: id },
        { $set: obj },
        { new: true }
      );
      if (!data) return res.status(400).json({ error: "Data not found" });
      return res.status(200).json({ success: "Successfully Updated" });
    } catch (error) {
      console.log(error);
    }
  }

  async deletecorporate(req, res) {
    try {
        const id =req.params.id;
        if(!id){
          return res.status(200).json('Data Not Found...');
        }
        await Addcorparatemodal.deleteOne({ _id: id })
        return res.status(200).json({ success: 'Deleted Sucessfully...' });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};
async corporateItemStatus(req, res) {
  const { id } = req.params; // Restaurant ID from URL params
    const { status } = req.query; // Status query parameter to determine action

    // Check if the status query parameter is valid
    if (status !== "block" && status !== "unblock") {
        return res.status(400).json({ error: "Invalid status parameter. Use 'block' or 'unblock'." });
    }

    try {
        // Determine the new status for the restaurant
        const isBlocked = status === "block";

        // Update the specific restaurant's 'blocked' field
        const updatedRestaurant = await Addapartmenmodal.findByIdAndUpdate(
            id,
            { $set: { blocked: isBlocked } },
            { new: true, runValidators: true } // Return the updated document
        );

        if (!updatedRestaurant) {
            return res.status(404).json({ error: "Restaurant not found" });
        }

        return res.status(200).json({ success: `Restaurant ${status}ed successfully`, data: updatedRestaurant });
    } catch (error) {
        console.error(`Error ${status}ing restaurant:`, error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
}

const Corporatecontroller = new Addcorporate();
module.exports = Corporatecontroller;
