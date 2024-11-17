const ContactusModel = require("../../Model/Admin/Contactus");

class Contactus {
  // post method
  async contactus(req, res) {
    try {
      let {CAddress, CPhone, CEmail, } = req.body;
    //   let file = req.files[0]?.filename;

      const newcontactus = new ContactusModel({
        CAddress, CPhone, CEmail, 
  
      });
      newcontactus.save().then((data) => {
        return res.status(200).json({ success: "Data Added Successfully" });
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: "Data Cannot be added" });
    }
  }
  // get method
  async getcontactus(req, res) {
    try {
      const getcontactus = await ContactusModel.find({});
      if (getcontactus) {
        return res.status(200).json({ getcontactus: getcontactus });
      }
    } catch (error) {
      console.log(error);
    }
  }
  //delete method
  async Deletecontactus(req, res) {
    try {
      const deletecontactus = req.params.Id;
      await ContactusModel.deleteOne({ _id: deletecontactus });
      return res.status(200).json({ success: "Deleted Successfully" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: "Cannot be Deleted" });
    }
  }
  //update method
  async editcontactus(req, res) {
    let { id,  CAddress, CPhone, CEmail, } = req.body;
    // let file = req.files[0]?.filename;
    let obj = {};
    if (CAddress) {
      obj["CAddress"] = CAddress;
    }
    if (CPhone) {
        obj["CPhone"] = CPhone;
      }
      if (CEmail) {
        obj["CEmail"] = CEmail;
      }
   
    try {
      let data = await ContactusModel.findByIdAndUpdate(
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

const contactusController = new Contactus();
module.exports = contactusController;
