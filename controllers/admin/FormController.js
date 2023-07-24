const BtechModel = require("../../models/btech");

class FormController {
  static form = async (req, res) => {
    res.render("admin/form");
  };
  static forminsert = async (req, res) => {
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
      res.redirect("/admin/formview");
    } catch (err) {
      console.log(err);
    }
  };
  static formview = async (req, res) => {
    try {
      const{name,image,_id} = req.admin
      const result = await BtechModel.find({user_id:_id});


      res.render("admin/formview", { r:name,s:image ,f: result });
    } catch (err) {
      console.log(err); 
    }
  };
  static formedit = async (req, res) => {
    try {
      const result = await BtechModel.findById(req.params.id);
      const{name,image}=req.admin
      res.render("admin/formedit", { r:name,s:image,f: result });
    } catch (err) {
      console.log(err);
    }
  };
  static formupdate = async (req, res) => {
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
      res.redirect("/admin/formview");
    } catch (err) {
      console.log(err);
    }
  };



  static formdelete = async (req, res) => {
    try {
      // for image deletion
      const data = await BtechModel.findById(req.params.id);
      // cons.log(blogdata);
      
      

      const result = await BtechModel.findByIdAndDelete(req.params.id);
      res.redirect("/admin/bcaformview");
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = FormController;
