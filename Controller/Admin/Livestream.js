const LivestreamModel = require("../../Model/Admin/Livestream");

class Livestream {
  // post method
  async Livestream(req, res) {
    try {
      let { LivestreamTitle, Livestream } = req.body;
      let file = req.files[0]?.filename;

      const newlivestream = new LivestreamModel({
        LivestreamTitle,
        Livestream: file,
      });
      newlivestream.save().then((data) => {
        return res.status(200).json({ success: "Data Added Successfully" });
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: "Data Cannot be added" });
    }
  }
  // get method
  async getLivestream(req, res) {
    try {
      const getLivestream = await LivestreamModel.find({});
      if (getLivestream) {
        return res.status(200).json({ getLivestream: getLivestream });
      }
    } catch (error) {
      console.log(error);
    }
  }
  //delete method
  async DeleteLivestream(req, res) {
    try {
      const deleteLivestream = req.params.Id;
      await LivestreamModel.deleteOne({ _id: deleteLivestream });
      return res.status(200).json({ success: "Deleted Successfully" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: "Cannot be Deleted" });
    }
  }
  //update method
  async editLivestream(req, res) {
    let { id, LivestreamTitle, Livestream } = req.body;
    let file = req.files[0]?.filename;
    let obj = {};
    if (LivestreamTitle) {
      obj["LivestreamTitle"] = LivestreamTitle;
    }
    if (file) {
      obj["Livestream"] = file;
    }

    try {
      let data = await LivestreamModel.findByIdAndUpdate(
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

const LivestreamController = new Livestream();
module.exports = LivestreamController;
