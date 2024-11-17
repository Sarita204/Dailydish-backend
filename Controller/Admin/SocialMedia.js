const SocialModel = require("../../Model/Admin/SocialMedia");

class Social {
  // post method
  async social(req, res) {
    try {
      let {CBanner, CText} = req.body;
      let file = req.files[0]?.filename;

      const newsocial = new SocialModel({
        CBanner: file,
        CText,
  
      });
      newsocial.save().then((data) => {
        return res.status(200).json({ success: "Data Added Successfully" });
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: "Data Cannot be added" });
    }
  }
  // get method
  async getsocial(req, res) {
    try {
      const getsocial = await SocialModel.find({});
      if (getsocial) {
        return res.status(200).json({ getsocial: getsocial });
      }
    } catch (error) {
      console.log(error);
    }
  }
  //delete method
  async Deletesocial(req, res) {
    try {
      const deletesocial = req.params.Id;
      await SocialModel.deleteOne({ _id: deletesocial });
      return res.status(200).json({ success: "Deleted Successfully" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: "Cannot be Deleted" });
    }
  }
  //update method
  async editsocial(req, res) {
    let { id, CBanner, CText} = req.body;
    let file = req.files[0]?.filename;

    let obj = {};

    if (file){
        obj["CBanner"] = file;
    }
    if (CText){
      obj["CText"] = CText;
  }
    try {
      let data = await SocialModel.findByIdAndUpdate(
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

const socialController = new Social();
module.exports = socialController;
