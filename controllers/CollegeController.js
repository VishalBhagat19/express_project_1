const BtechModel = require("../models/btech");
const LoginModel = require("../models/login");

class CollegeController {
  static displaydata = async (req, res) => {
    try {
      const { name, image } = req.admin;
      const data = await BtechModel.find();
      res.render("admin/college/dashboard", { r: name, s: image, f: data });
    } catch (err) {
      console.log(err);
    }
  };

  static cpassword = async (req, res) => {
    try {
      const { name, image } = req.admin;
      res.render("cpassword", {
        message: req.flash("success"),
        message1: req.flash("error"),
        r: name,
        s: image,
      });
    } catch (err) {
      console.log(err);
    }
  };

  static updatepassword = async (req, res) => {
    try {
      console.log(req.body)
      const { oldPassword, newPassword, confirmPassword } = req.body;

      if (oldPassword && newPassword && confirmPassword) {
        const admin = await LoginModel.findById(req.admin.id).select(
          "+password"
        );
        const isMatch = await bcrypt.compare(oldPassword, admin.password);
        //const isPasswordMatched = await userModel.comparePassword(req.body.oldPassword);
        if (!isMatch) {
          req.flash("error", "old password is incorecct");
          res.redirect("/cpassword");
        } else {
          if (newPassword !== confirmPassword) {
            req.flash(
              "error",
              "password and confirm password doesnt match!"
            );
            res.redirect("/cpassword");
          } else {
            const salt = await bcrypt.genSalt(10);
            const newhashPassword = await bcrypt.hash(newPassword, salt);
            //console.log(req.user)
            await LoginModel.findByIdAndUpdate(req.admin.id, {
              $set: { password: newhashPassword },
            });
            req.flash("success", "password change successfully");
            res.redirect("/cpassword");
          }
        }
      } else {
        req.flash("error", "All field are required");
        res.redirect("/cpassword");
      }
    } catch (err) {
      console.log(err);
    }
  };
}
module.exports = CollegeController;
