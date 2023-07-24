const randomstring = require("randomstring");
const nodemailer = require("nodemailer");
const LoginModel = require("../models/login");
class PasswordController {
  static password = async (req, res) => {
    try {
      res.render("password/forgot", {
        message: req.flash("success"),
        message1: req.flash("error"),
      });
    } catch (error) {
      console.log(error);
    }
  };

  static verify_psw = async (req, res) => {
    try {
      const { email } = req.body;
      console.log(email);
      const admin = await LoginModel.findOne({ email: email });
      console.log(admin);
      if (admin) {
        const sendMail = (email, otp) => {
          var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              admin: "vibhuvishal80@gmail.com",
              pass: "sflqxoonkopvpzxc",
            },
          });

          var mailOptions = {
            from: "vibhuvishal80@gmail.com",
            to: email,
            subject: "Password change",
            html: `<div style="padding:10px;font-size:12px;color:#343377;font-family:Georgia, 'Times New Roman', Times, serif;"><p>Hello User,</p><p>Thank you for choosing Resume Builder. Use this OTP to complete your Sign Up procedure and verify your account on Resume Builder.</p><p>Remember, Never share this OTP with anyone.</p><span style="width:fit-content;margin:auto;background-color:#13123e;color:white;padding:7px;border-radius:15px;display:block;">${otp}</span><p>Regards,</p><p>Team Resume Builder</p></div>`,
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
              req.flash("error", "Email Send Successfully,Please check Email");
              res.redirect("/forgot/create");
            }
          });
        };
      } else {
        req.flash("error", "Please Enter Valid Gmail");
        res.redirect("/forgot/create");
      }
    } catch (error) {
      console.log(error);
    }
  };
}
module.exports = PasswordController;
