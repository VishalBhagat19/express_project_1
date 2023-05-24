const BtechModel = require("../../models/btech");
class BtechController {
  static btech = async (req, res) => {
    res.render("admin/btech/btechform");
  };
  static btechinsert = async (req, res) => {
    try {
      const{_id} = req.admin
      const result = new BtechModel({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        gender: req.body.gender,
        dob: req.body.date,
        address: req.body.address,
        college: req.body.college,
        course: req.body.course,
        branch: req.body.branch,
        user_id:_id,

      });
      await result.save();
      //route url in redirect
      res.redirect("/admin/btechformview");
    } catch (err) {
      console.log(err);
    }
  };
  static btechview = async (req, res) => {
    try {      
      const{name,image,_id}=req.admin
      const result = await BtechModel.find({user_id:_id});

      res.render("admin/btech/btechformview", {r:name,s:image, f: result });
    } catch (err) {
      console.log(err);
    }
  };
  static Btechedit = async (req, res) => {
    try {
      const result = await BtechModel.findById(req.params.id);
      const{name,image}=req.admin
      res.render("admin/btech/btechformedit", {r:name,s:image, f: result });
    } catch (err) {
      console.log(err);
    }
  };
  static Btechupdate = async (req, res) => {
    try {
      const data = await BtechModel.findByIdAndUpdate(req.params.id,{
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        gender: req.body.gender,
        dob: req.body.date,
        address: req.body.address,
        college: req.body.college,
        branch: req.body.branch,
      });
      await data.save();
      res.redirect("/admin/btechformview");
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = BtechController;
