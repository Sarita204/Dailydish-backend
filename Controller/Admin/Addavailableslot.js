const availableslots = require("../../Model/Admin/Addavailableslot");

class Availableslots {
  async addavailableslots(req, res) {
    let {
        Availableslots,
        Mainslots,
    } = req.body;
    try {
      let Newuser = new availableslots({
        Availableslots,
        Mainslots,
      });
      if (
        !Availableslots ||
        !Mainslots 
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

  async getavailableslots(req, res) {
    let Newaddress = await availableslots.find({});
    if (Newaddress) {
      return res.status(200).json({ Newaddress: Newaddress});
    } else {
      return res.status(500).json({ error: "something went wrong" });
    }
  }
  async updateavailableslots(req, res) {
    try {
      let {Mainslots,Availableslots,userId} = req.body;
      let obj = {};
      if (Mainslots) {
        obj["Mainslots"] = Mainslots;
      }
      if (Availableslots) {
        obj["Availableslots"] = Availableslots;
      }
      let data = await availableslots.findByIdAndUpdate(
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
  async deleteavailableslots(req, res) {
    try {
        const id =req.params.id;
        console.log("id",id);
        if(!id){
          return res.status(200).json('Data Not Found...');
        }
        await availableslots.deleteOne({ _id: id })
        return res.status(200).json({ success: 'Deleted Sucessfully...' });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};
}

const availablecontroller = new Availableslots();
module.exports = availablecontroller;
