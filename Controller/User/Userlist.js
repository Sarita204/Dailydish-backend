const CustomerModel = require("../../Model/User/Userlist");
// const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const mongoose = require("mongoose");
const otpModel = require("../../Model/User/Otp");
const { default: axios } = require("axios");

class Customer {
  async loginWithOtp(req, res) {
    const { Mobile } = req.body;
    try {
      // Check if the mobile number is already registered
      let customer = await CustomerModel.findOne({ Mobile: Mobile });

      if (!customer) {
        // Mobile not present, create a new user (Registration)
        customer = await CustomerModel.create({
          Mobile: Mobile,
        });
        console.log("New user created with Mobile Number:", Mobile);
      } else {
        console.log("Mobile number already registered, proceeding to login.");
      }

      // Generate OTP
      let otp = (Math.floor(Math.random() * 1000000) + 1000000)
        .toString()
        .substring(1);

      // Checking if the OTP is already present in the DB or not.
      const existingOtp = await otpModel.findOne({ Mobile: Mobile });

      const key = "Ae97f7ad9d6c2647071d78b6e94a3c87e";
      const sid = "RDABST";
      const to = Mobile;
      const body = `Hi, Your OTP for mobile verification is ${otp}. Regards, Team Alxmart`;

      axios
        .get(
          "https://api-alerts.kaleyra.com/v4/?api_key=" +
          key +
          "&method=sms&message=" +
          body +
          "&to=" +
          to +
          "&sender=RDABST"
        )
        .then(async (data) => {
          // If OTP not present, create a new record
          if (!existingOtp) {
            let newOtp = new otpModel({
              Mobile,
              otp,
            });

            newOtp
              .save()
              .then((data) => {
                return res.status(200).json({
                  success: `OTP sent: ${data.otp}`,
                  message: customer.isNew
                    ? "Registration successful, OTP sent"
                    : "Login successful, OTP sent",
                  details: customer,
                });
              })
              .catch((error) => {
                return res.status(402).json({ error: "Error saving OTP" });
              });
          } else {
            // Update the existing OTP
            await otpModel.findOneAndUpdate(
              { Mobile: Mobile },
              { $set: { otp: otp } },
              { new: true }
            );

            return res.status(200).json({
              success: "OTP sent successfully",
              message: customer.isNew
                ? "Registration successful, OTP sent"
                : "Login successful, OTP sent",
              details: customer,
            });
          }
        })
        .catch((error) => {
          console.error(error);
          return res.status(500).json({ error: "Error sending OTP" });
        });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  // OTP Varification==========================

  async otpVarification(req, res) {
    const { Mobile, otp } = req.body;
    console.log(",,Mobile, otp", Mobile, otp);

    try {
      const varify = await otpModel.findOne({
        Mobile: Mobile,
        otp: otp,
      });

      if (!varify) {
        return res.status(400).json({ error: "OTP is wrong" });
      }
      const isPhonePresent = await CustomerModel.findOne({
        Mobile: Mobile,
      });
      if (isPhonePresent.BlockCustomer == false)
        return res
          .status(400)
          .json({ error: "Your Account Is Blocked Pls Contact Admin" });

      return res
        .status(200)
        .json({ success: "OTP varified...", details: isPhonePresent });
    } catch (error) {
      console.log(error);
    }
  }

  async AddCustomer(req, res) {
    try {
      let { Fname, Mobile, Address, Flatno } = req.body;
      console.log("data", Fname, Mobile, Address, Flatno);

      const checkMobileno = await CustomerModel.findOne({ Mobile: Mobile });
      if (checkMobileno) {
        return res.status(400).json({ error: "Mobile is already exist" });
      }

      const Adddata = new CustomerModel({
        Fname,
        Mobile,
        Address,
        Flatno,
      });

      Adddata.save().then((data) => {
        return res
          .status(200)
          .json({ success: "Register Successfully..!", details: Adddata });
      });
    } catch (error) {
      return res.status(401).json({ error: "Register Not Successfully..!" });
    }
  }

  async loginCustomer(req, res) {
    let { Email, Password, token } = req.body;

    try {
      if (!Email || !Password) {
        return res.status(400).json({ error: "Please fill all the field" });
      }

      let isUserPresent = await CustomerModel.findOne({ Email: Email });
      if (!isUserPresent) {
        return res
          .status(400)
          .json({ error: "Please Enter Registered Email Id..." });
      }

      const isCorrectPassword = await compare(Password, isUserPresent.Password);

      if (!isCorrectPassword) {
        return res
          .status(400)
          .json({ error: "Authentication is failed!!! password is wrong" });
      }

      if (isUserPresent.BlockCustomer === false) {
        return res.status(400).json({
          error: "Authentication is failed!!! Your Account is Blocked by Admin",
        });
      }
      isUserPresent.token = token;
      isUserPresent = await isUserPresent.save();

      return res
        .status(200)
        .json({ success: "Login Successfully...", details: isUserPresent });
    } catch (error) {
      console.error(error);
    }
  }

  async sendMail(req, res) {
    try {
      let { Email } = req.body;
      const isUserPresent = await CustomerModel.findOne({ Email: Email });
      if (!isUserPresent) {
        return res
          .status(400)
          .json({ error: "Please Enter Registered Email Id..." });
      }
      // Create a transporter
      const transporter = nodemailer.createTransport({
        service: "gmail", // Replace with your email service provider
        auth: {
          user: "amitparnets@gmail.com", // Replace with your email
          pass: "yzbzpllsthbvrdal", // Replace with your password or app-specific password
        },
        port: 465,
        host: "gsmtp.gmail.com",
      });

      // Generate a random OTP
      const otp = randomstring.generate({
        length: 6,
        charset: "numeric",
      });

      // Save the OTP to the user document in MongoDB
      isUserPresent.otp = otp;

      // Set a timer to clear the OTP after the expiration time
      setTimeout(() => {
        isUserPresent.otp = null; // Clear the OTP
        isUserPresent.save(); // Save the user document with the cleared OTP
      }, 60 * 1000); // Convert OTP_EXPIRATION_TIME to milliseconds

      await isUserPresent.save();

      // Email configuration
      const mailOptions = {
        from: "amitparnets@gmail.com",
        to: Email,
        subject: "OTP Verification",
        text: `Your OTP is: ${otp}`,
      };

      // Send the OTP via email
      const info = await transporter.sendMail(mailOptions);

      console.log("OTP sent:", info.response);
      res.json({ success: "OTP sent successfully" });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: "Failed to send OTP" });
    }
  }

  async Otpverification(req, res) {
    try {
      let { otp, Email } = req.body;

      const user = await CustomerModel.findOne({ Email: Email });
      if (user.otp == otp) {
        return res.status(200).json({ success: " OTP verified successfully" });
      } else {
        // OTPs do not match
        return res.status(400).json({ error: "Invalid OTP" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async NewPassword(req, res) {
    try {
      const { Password, Email } = req.body;
      // Check if the email exists in the database
      const user = await CustomerModel.findOne({ Email: Email });

      if (user) {
        // Hash the new password if provided
        if (Password) {
          const hashedPassword = await hash(Password, 10);
          user.Password = hashedPassword; // Update the user's password
        }

        // Save the updated user document
        const updatedUser = await user.save();

        return res.status(200).json({
          success: "Password updated successfully",
          data: updatedUser,
        });
      } else {
        return res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async updatedUser(req, res) {
    try {
      let {
        userId,
        Fname,
        Mobile,
        Email,
        address,
        Password,
        Nooforders,
        Lastorderdate,
        lastorderamount,
      } = req.body;
      let obj = {};
      if (Fname) {
        obj["Fname"] = Fname;
      }
      if (Mobile) {
        obj["Mobile"] = Mobile;
      }
      if (Email) {
        obj["Email"] = Email;
      }

      if (address) {
        obj["address"] = address;
      }
      if (Nooforders) {
        obj["Nooforders"] = Nooforders;
      }
      if (Lastorderdate) {
        obj["Lastorderdate"] = Lastorderdate;
      }
      if (lastorderamount) {
        obj["lastorderamount"] = lastorderamount;
      }
      if (Password) {
        Password = await hash(Password, 10);
        obj["Password"] = Password;
      }
      let data = await CustomerModel.findByIdAndUpdate(
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

  async profileimg(req, res) {
    try {
      const { userid } = req.body;
      const profileImage = req.files[0].filename;

      if (!mongoose.Types.ObjectId.isValid(userid)) {
        return res.status(400).json({ error: "Invalid user ID" });
      }
      const updatedUser = await CustomerModel.findByIdAndUpdate(
        userid,
        { $set: { profileImage: profileImage } },
        { new: true }
      );

      if (updatedUser) {
        return res
          .status(200)
          .json({ success: updatedUser, msg: "Image uploaded successfully" });
      } else {
        return res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getRegisterUser(req, res) {
    try {
      const getRegisterDetails = await CustomerModel.find({});
      if (getRegisterDetails) {
        return res.status(200).json({ success: getRegisterDetails });
      }
      console.log("getRegisterDetails", getRegisterDetails);
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // Block & unBlock User
  async BlockUser(req, res) {
    const BlockId = req.params.id;
    try {
      const User = await CustomerModel.findById({ _id: BlockId });
      if (User.BlockCustomer === false) {
        await CustomerModel.findByIdAndUpdate(
          { _id: User._id },
          { $set: { BlockCustomer: true } },
          { new: true }
        );
        return res.status(200).json({ msg: "Customer Unblocked " });
      } else {
        await CustomerModel.findByIdAndUpdate(
          { _id: User._id },
          { $set: { BlockCustomer: false } },
          { new: true }
        );
        return res.status(200).json({ success: "Customer Blocked" });
      }
    } catch (error) {
      console.log(error);
    }
  }
}
const CutomerController = new Customer();
module.exports = CutomerController;
