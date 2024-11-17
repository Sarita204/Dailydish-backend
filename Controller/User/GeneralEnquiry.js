const EnquiryModal = require("../../Model/User/GeneralEnquiry");

class Enquiry {
  async EnquiryEnquiry(req, res) {
    try {
      let { Name, Number, ApartmentName, Message } = req.body;
      const AddEnquiry = new EnquiryModal({
        Name,
        Number,
        ApartmentName,
        Message,
      });
      AddEnquiry.save()
        .then((data) => {
          return res.status(200).json({ success: "Enquiry Sent Successfully" });
        })
        .catch((error) => {
          console.log(error);
          return res.status(400).json({ error: "please try again!" });
        });
    } catch (error) {
      return res.status(400).json({ error: "Message not Sent..!" });
    }
  }

  async getEnquiryenquiry(req, res) {
    try {
      const getdata = await EnquiryModal.find({});
      if (getdata) {
        return res.status(200).json({ getdata: getdata });
      } else {
        return res.status(400).json({ error: "Message not Sent..!" });
      }
    } catch (error) {
      return res.status(400).json({ error: "Message not Sent..!" });
    }
  }

  async DeleteEnquiryList(req, res) {
    try {
      const EnquiryListId = req.params.id;
      await EnquiryModal.deleteOne({ _id: EnquiryListId });
      return res.status(200).json({ success: "Deleted Sucessfully..." });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

const EnquiryController = new Enquiry();
module.exports = EnquiryController;
