const AddressModel = require("../../Model/User/Addrequestaddress");

class Address {
  async addAddress(req, res) {
    let {
      Address,
      Addresstype,
      userId,
    } = req.body;
    try {
      let Newuser = new AddressModel({
        Address,
        Addresstype,
        userId,
      });
      if (
        !Address ||
        !Addresstype ||
        !userId
      ) {
        return res.status(501).json({ error: "Please fill all fields" });
      } else {
        Newuser.save().then((data) => {
          console.log(data);
          return res.status(200).json({ success: "success" });
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getAddress(req, res) {
    let Newaddress = await AddressModel.find({});
    if (Newaddress) {
      return res.status(200).json({ Newaddress: Newaddress});
    } else {
      return res.status(500).json({ error: "something went wrong" });
    }
  }
  async updatedaddress(req, res) {
    try {
      let {  Address,
        Addresstype,
        userId, } = req.body;
      let obj = {};
      if (Address) {
        obj["Address"] = Address;
      }
      if (Addresstype) {
        obj["Addresstype"] = Addresstype;
      }
      let data = await AddressModel.findByIdAndUpdate(
        userId,
        { $set: obj },
        { new: true }
      );

      if (!data) return res.status(400).json({ error: "Something went wrong" });
      return res
        .status(200)
        .json({ success: "update successfully", userdata: data });
    } catch (error) {
      console.log(error);
    }
  }
  async deleteAddress(req, res) {
    try {
        const id =req.params.id;
        console.log("id",id);
        if(!id){
          return res.status(200).json('Data Not Found...');
        }
        await AddressModel.deleteOne({ _id: id })
        return res.status(200).json({ success: 'Deleted Sucessfully...' });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};
}

const Addresscontroller = new Address();
module.exports = Addresscontroller;
