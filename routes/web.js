const express = require("express")
const BcaController = require("../controllers/admin/BcaController")
const BtechController = require("../controllers/admin/BtechController")
const CollegeController = require("../controllers/CollegeController")
const FormController = require("../controllers/admin/FormController")
const FrontendController = require("../controllers/FrontendController")
const admin_auth = require('../middleware/auth')

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
router.get('/college/dashboard',admin_auth,CollegeController.displaydata)
router.get('/cpassword',admin_auth,CollegeController.cpassword)
router.post('/updatepassword',admin_auth,CollegeController.updatepassword)

// +++++++++++mba controller=====================
router.get('/admin/formview',admin_auth,FormController.formview)
router.post('/forminsert',admin_auth,FormController.forminsert)
router.get('/admin/formedit/:id',admin_auth,FormController.formedit)
router.post('/formupdate/:id',admin_auth,FormController.formupdate)
// router.get('/admin/formview',FormController.formview)



////////////////////btech controller///////////////////
router.get('/admin/btechformview',admin_auth,BtechController.btechview)
router.get('/admin/btechformedit/:id',admin_auth,BtechController.Btechedit)
router.post('/btechinsert',admin_auth,BtechController.btechinsert)
router.post('/Btechupdate/:id',admin_auth,BtechController.Btechupdate)
    

////////////////////bca controller///////////////////
router.get('/admin/bcaformview',admin_auth,BcaController.bcaview)
router.get('/admin/bcaformedit/:id',admin_auth,BcaController.Bcaedit)
router.post('/bcainsert',admin_auth,BcaController.bcainsert)
router.post('/Bcaupdate/:id',admin_auth,BcaController.Bcaupdate)




// //////////////////////forgot [password]///////////////
// router.get('/forgotpass',FrontendController.forgotpassword)
// router.get('/resetpass',FrontendController.resetpassword)
module.exports = router