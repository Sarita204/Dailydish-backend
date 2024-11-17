const dWebstoriesmodal = require("../../Model/Admin/Addwebstories");

class Addstories {
  // post method
  async Addstories(req, res) {
    try {
      let { StoriesImage, StoriesText } = req.body;
      let file = req.files[0]?.filename;

      const newbanner = new dWebstoriesmodal({
        StoriesText,
        StoriesImage: file,
      });
      newbanner.save().then((data) => {
        return res
          .status(200)
          .json({ success: "Web Story Added Successfully" });
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: "Data Cannot be added" });
    }
  }
  // get method
  async getstories(req, res) {
    try {
      const getbanner = await dWebstoriesmodal.find({});
      if (getbanner) {
        return res.status(200).json({ getbanner: getbanner });
      }
    } catch (error) {
      console.log(error);
    }
  }
  //delete method
  async Deletestories(req, res) {
    try {
      const deletebanner = req.params.Id;
      await dWebstoriesmodal.deleteOne({ _id: deletebanner });
      return res.status(200).json({ success: "Deleted Successfully" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: "Cannot be Deleted" });
    }
  }
  //update method
  async editstories(req, res) {
    let { id, StoriesImage, StoriesText } = req.body;
    let file = req.files[0]?.filename;
    let obj = {};
    if (StoriesText) {
      obj["StoriesText"] = StoriesText;
    }
    if (file) {
      obj["StoriesImage"] = file;
    }

    try {
      let data = await dWebstoriesmodal.findByIdAndUpdate(
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

const storiescontroller = new Addstories();
module.exports = storiescontroller;
