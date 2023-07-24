const express = require("express")
const BcaController = require("../controllers/admin/BcaController")
const BtechController = require("../controllers/admin/BtechController")
const CollegeController = require("../controllers/CollegeController")
const FormController = require("../controllers/admin/FormController")
const FrontendController = require("../controllers/FrontendController")
const admin_auth = require('../middleware/auth')
const ContactController = require("../controllers/ContactController")
const passwordController = require("../controllers/PasswordController")
const PasswordController = require("../controllers/PasswordController")

const router = express.Router()

router.get('/',FrontendController.login)
router.get('/register',FrontendController.adminregister)
router.post('/verify_login',FrontendController.verifylogin)
router.post('/adminregister',FrontendController.admininsert)


///////////////////////after login//////////////////////////////////

router.get('/home',admin_auth,FrontendController.home)
router.get('/about',admin_auth,FrontendController.about)
router.get('/contact',admin_auth,FrontendController.contact)

router.get('/form',admin_auth,FrontendController.form)

  

router.get('/btech',admin_auth,FrontendController.btech)
router.get('/bca',admin_auth,FrontendController.bca)
router.get('/logout',admin_auth,FrontendController.logout)

    
////////////////college controller///////////
router.get('/college/display',admin_auth,CollegeController.displaydata)

router.get('/college/dashboard',admin_auth,CollegeController.dashboarddata)

// router.get('/college/contact',admin_auth,CollegeController.contact)
router.get('/cpassword',admin_auth,CollegeController.cpassword)
router.post('/updatepassword',admin_auth,CollegeController.updatepassword)
router.post('/update_approve/:id',admin_auth,CollegeController.update_approval)
// +++++++++++mba controller=====================
router.get('/admin/formview',admin_auth,FormController.formview)
router.post('/forminsert',admin_auth,FormController.forminsert)
router.get('/admin/formedit/:id',admin_auth,FormController.formedit)
router.get('/admin/formdelete/:id',admin_auth,FormController.formdelete)
router.post('/formupdate/:id',admin_auth,FormController.formupdate)
// router.get('/admin/formview',FormController.formview)



//====================contact controller===============
router.post('/contactinsert',admin_auth,ContactController.contactinsert)
router.get('/college/contact',admin_auth,ContactController.contactview)
// router.get('/college/contact')



////////////////////btech controller///////////////////
router.get('/admin/btechformview',admin_auth,BtechController.btechview)
router.get('/admin/btechformedit/:id',admin_auth,BtechController.Btechedit)
router.get('/admin/formdelete/:id',admin_auth,BtechController.formdelete)
router.post('/btechinsert',admin_auth,BtechController.btechinsert)
router.post('/Btechupdate/:id',admin_auth,BtechController.Btechupdate)
    

////////////////////bca controller///////////////////
router.get('/admin/bcaformview',admin_auth,BcaController.bcaview)
router.get('/admin/bcaformedit/:id',admin_auth,BcaController.Bcaedit)
router.get('/admin/formdelete/:id',admin_auth,BcaController.formdelete)
router.post('/bcainsert',admin_auth,BcaController.bcainsert)
router.post('/Bcaupdate/:id',admin_auth,BcaController.Bcaupdate)




//////////////////forgot [password]///////////////
router.get('/forgot',PasswordController.password)
router.post('/verify',PasswordController.verify_psw)
// router.get('/resetpass',FrontendController.resetpassword)






router.post('/changepassword',admin_auth,FrontendController.changepassword)
router.post('/updateprofile',admin_auth,FrontendController.updateprofile)
module.exports = router