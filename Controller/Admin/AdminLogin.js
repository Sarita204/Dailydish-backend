const RegistrationModel = require("../../Model/Admin/AdminLogin");

class Registration {
  async Registration(req, res) {
    let { REmail, RPassword } = req.body;
    try {
      
      if (!RPassword) {
        return res.status(400).json({ msg: "Please Enter Your Phone" });
      }
      if (!REmail) {
        return res.status(400).json({ msg: "Please Enter Your Email" });
      }

      const newRegistration = new RegistrationModel({ REmail, RPassword });
      newRegistration.save().then((data) => {
        return res.status(200).json({ success: "Registration  Done...." });
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: "Something Went Wrong...." });
    }
  }
  
  async adminLogin(req, res) {
    try {
      let { REmail, RPassword } = req.body;
      if (!REmail || !RPassword) {
        return res.status(400).json({ error: "Please fill all the field" });
      }
      const isAdminPresent = await RegistrationModel.findOne({
        REmail: REmail,
      });
      if (!isAdminPresent) {
        return res.status(400).json({ error: "Your Email Is Not register" });
      }

      const isAdminPassword = await RegistrationModel.findOne({
        RPassword: isAdminPresent.RPassword,
      });
      if (!isAdminPassword) {
        return res.status(400).json({ error: "Password is In-Correct.." });
      }

      return res.status(200).json({
        success: "Admin Login Successfully",
        adminlogin: isAdminPresent,
      });
    } catch (error) {
      console.error(error);
    }
  }
}
const RegistrationController = new Registration();
module.exports = RegistrationController;
