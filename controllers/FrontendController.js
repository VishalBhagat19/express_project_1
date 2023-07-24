const LoginModel = require("../models/login");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const BtechModel = require("../models/btech");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "df0jht2dd",
  api_key: "299132352993518",
  api_secret: "p-ZFBgMJu9iAunrDnsJF5i9s2tY",
  // secure: true
});

class FrontendController {
  static home = async (req, res) => {
    try {
      const { name, image, _id } = req.admin;
      const btech = await BtechModel.findOne({
        user_id: _id,
        course: "B.TECH",
      });
      const bca = await BtechModel.findOne({ user_id: _id, course: "BCA" });
      const mba = await BtechModel.findOne({ user_id: _id, course: "MBA" });
      res.render("home", { r: name, s: image, bt: btech, bc: bca, mb: mba });
    } catch (error) {
      console.log(error);
    }
  };

  static about = async (req, res) => {
    try {
      const { name, image } = req.admin;
      res.render("about", { r: name, s: image });
    } catch (err) {
      console.log(err);
    }
  };
  static contact = async (req, res) => {
    try {
      const { name, image } = req.admin;
      res.render("contact", { r: name, s: image });
    } catch (err) {
      console.log(err);
    }
  };

  static form = async (req, res) => {
    try {
      const { name, image, email } = req.admin;
      res.render("form", { r: name, s: image, n: email });
    } catch (err) {
      console.log(err);
    }
  };
  static btech = async (req, res) => {
    try {
      const { name, image, email } = req.admin;
      res.render("btech", { r: name, s: image, n: email });
    } catch (err) {
      console.log(err);
    }
  };
  static bca = async (req, res) => {
    try {
      const { name, image, email } = req.admin;
      res.render("bca", { r: name, s: image, n: email });
    } catch (err) {
      console.log(err);
    }
  };

  static adminregister = async (req, res) => {
    try {
      res.render("register", { message: req.flash("error") });
    } catch (err) {
      console.log(err);
    }
  };

  static admininsert = async (req, res) => {
    const file = req.files.image;
    const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "register_image",
    });

    try {
      // console.log(req.body);

      // console.log(req.body);
      const { name, email, password, cpassword } = req.body;
      const admin = await LoginModel.findOne({ email: email });
      if (admin) {
        req.flash("error", "email already exists! ");
        res.redirect("/register");
      } else {
        if (name && email && password && cpassword) {
          if (password == cpassword) {
            try {
              const hashpassword = await bcrypt.hash(password, 10);
              const result = new LoginModel({
                name: name,
                email: email,
                password: hashpassword,
                image: {
                  public_id: myimage.public_id,
                  url: myimage.secure_url,
                },
              });
              await result.save();
              req.flash("success", "registration sucessful :)");
              res.redirect("/");
            } catch (err) {
              console.log(err);
            }
          } else {
            req.flash("error", "password and confirm password doesnt match!");
            res.redirect("/register");
          }
        } else {
          req.flash("error", "all fields are required");
          res.redirect("/register");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  static verifylogin = async (req, res) => {
    try {
      console.log(req.body);
      const { email, password } = req.body;
      if (email && password) {
        const admin = await LoginModel.findOne({ email: email });
        if (admin != null) {
          const ismatched = await bcrypt.compare(password, admin.password);
          if (admin.email == email && ismatched) {
            if (admin.role == "user") {
              //token generate
              const token = jwt.sign({ id: admin._id }, "vishalbhagat2002");
              // console.log(token);
              res.cookie("token", token);

              res.redirect("/home");
            }
            if (admin.role == "admin") {
              //token generate
              const token = jwt.sign({ id: admin._id }, "vishalbhagat2002");
              // console.log(token);
              res.cookie("token", token);

              res.redirect("/college/dashboard");
            }
          } else {
            req.flash("error", "email or password not matched");
            res.redirect("/");
          }
        } else {
          req.flash("error", "You are not registered");
          res.redirect("/");
        }
      } else {
        req.flash("error", "All Fields are required");
        res.redirect("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  static login = async (req, res) => {
    try {
      res.render("login", {
        message: req.flash("success"),
        message1: req.flash("error"),
      });
    } catch (err) {
      console.log(err);
    }
  };

  static logout = async (req, res) => {
    try {
      res.clearCookie("token");
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  };

  static changepassword = async (req, res) => {
    try {
      const { name, image, _id } = req.admin;
      const { oldpassword, newpassword, cpassword } = req.body;
      if (oldpassword && newpassword && cpassword) {
        const user = await LoginModel.findById(_id);
        const ismatch = await bcrypt.compare(oldpassword, user.password);
        if (!ismatch) {
          req.flash("error", "old password is not match!!");
          res.redirect("/");
        } else {
          if (newpassword != cpassword) {
            req.flash("error", "password and confirm password does not match");
            res.redirect("/");
          } else {
            const newHashpassword = await bcrypt.hash(newpassword, 10);
            await LoginModel.findByIdAndUpdate(_id, {
              $set: { password: newHashpassword },
            });
            // alert("successfully change password!!");
            req.flash("success","password changes successfully!!")
            res.redirect("/home");
          }
        }
      } else {
        req.flash("error", "all fields are required");
        res.redirect("/");
      }
      // console.log(req.body)
    } catch (err) {
      console.log(err);
    }
  };

  static updateprofile=async(req,res)=>{
    try{
        // console.log(req.params.id)
        // console.log(req.body)
        //image delete
        const{name,image,email}=req.admin
        if(req.files){
        const profile=await LoginModel.findById(req.admin.id)
        const imageid=profile.image.public_id
        // console.log(imageiid)
        await cloudinary.uploader.destroy(imageid)
        //image update
        const file=req.files.image
        const myimage=await cloudinary.uploader.upload(file.tempFilePath,{
        folder:'logo_image'                   
        });
        var imgdata={
            name:req.body.name,
            email:req.body.email,
            image: {
                public_id: myimage.public_id,
                url: myimage.secure_url                     
            },
        }
        }else{
          var imgdata={
            name:req.body.name,
            email:req.body.email,
            }
        }
        const result=await LoginModel.findByIdAndUpdate(req.admin.id,imgdata)
        await result.save()
         res.redirect('/home')
    }catch(err){
        console.log(err)
    }
    // try{
    //     const{name,image}=req.admin
    //     console.log(req.files.image)
    // }catch(err){
    //     console.log(err)
      // }
    }
}
module.exports = FrontendController;
