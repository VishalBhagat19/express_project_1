
const BtechModel = require("../../models/btech");
class BcaController {
  static bca = async (req, res) => {
    res.render("admin/bca/bcaform");
  };
  static bcainsert = async (req, res) => {
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
      res.redirect("/admin/bcaformview");
    } catch (err) {
      console.log(err);
    }
  };
  static bcaview = async (req, res) => {
    try {
      const{name,image,_id} = req.admin
      const result = await BtechModel.find({user_id:_id});

      res.render("admin/bca/bcaformview", {r:name,s:image, f: result });
    } catch (err) {
      console.log(err);
    }
  };
  static Bcaedit = async (req, res) => {
    try {
      const result = await BtechModel.findById(req.params.id);
      const{name,image} = req.admin
      res.render("admin/bca/bcaformedit", {r:name,s:image, f: result });
    } catch (err) {
      console.log(err);
    }
  };
  static Bcaupdate = async (req, res) => {
    try {
      const data = await BtechModel.findOneAndUpdate(req.params.id,{
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
      res.redirect("/admin/bcaformview");
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = BcaController;
