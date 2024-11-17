const DelivarychargeModel = require("../../Model/Admin/DelivaryCharge");

class Delivarycharge {
  // post method
  async delivarycharge(req, res) {
    try {
      let { MinimumAmount, DelivaryCharge } = req.body;
      const newdelivarycharge = new DelivarychargeModel({
        MinimumAmount,
        DelivaryCharge,
      });
      newdelivarycharge.save().then((data) => {
        return res.status(200).json({ success: "Data Added Successfully" });
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: "Data Cannot be added" });
    }
  }
  // get method
  async getdelivarycharge(req, res) {
    try {
      const getdelivarycharge = await DelivarychargeModel.find({});
      if (getdelivarycharge) {
        return res.status(200).json({ getdelivarycharge: getdelivarycharge });
      }
    } catch (error) {
      console.log(error);
    }
  }
  //delete method
  async Deletedelivarycharge(req, res) {
    try {
      const deletedelivarycharge = req.params.Id;
      await DelivarychargeModel.deleteOne({ _id: deletedelivarycharge });
      return res.status(200).json({ success: "Deleted Successfully" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: "Cannot be Deleted" });
    }
  }
  //update method
  async editdelivarycharge(req, res) {
    let { id, MinimumAmount, DelivaryCharge } = req.body;
    // let file = req.files[0]?.filename;
    let obj = {};
    if (MinimumAmount) {
      obj["MinimumAmount"] = MinimumAmount;
    }
    if (DelivaryCharge) {
      obj["DelivaryCharge"] = DelivaryCharge;
    }

    try {
      let data = await DelivarychargeModel.findByIdAndUpdate(
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
}

const DelivarychargeController = new Delivarycharge();
module.exports = DelivarychargeController;
