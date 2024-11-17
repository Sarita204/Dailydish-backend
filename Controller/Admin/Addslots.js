const slotsmodal = require("../../Model/Admin/Addslots");

class Slots {
  async addslots(req, res) {
    let {
        mainslots
    } = req.body;
    try {
      let Newuser = new slotsmodal({
        mainslots
      });
      if (
        !mainslots
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

  async getslots(req, res) {
    let Newaddress = await slotsmodal.find({});
    if (Newaddress) {
      return res.status(200).json({ Newaddress: Newaddress});
    } else {
      return res.status(500).json({ error: "something went wrong" });
    }
  }
  async updateslots(req, res) {
    try {
      let {mainslots,userId} = req.body;
      let obj = {};
      if (mainslots) {
        obj["mainslots"] = mainslots;
      }
      
      let data = await slotsmodal.findByIdAndUpdate(
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
  async deleteslots(req, res) {
    try {
        const id =req.params.id;
        console.log("id",id);
        if(!id){
          return res.status(200).json('Data Not Found...');
        }
        await slotsmodal.deleteOne({ _id: id })
        return res.status(200).json({ success: 'Deleted Sucessfully...' });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};
}

const slotscontroller = new Slots();
module.exports = slotscontroller;
