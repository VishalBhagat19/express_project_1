const jwt = require('jsonwebtoken')
const LoginModel = require('../models/login')



const admin_auth = async(req,res,next)=>{
    // console.log('hello admin');
   try{
    const{token} = req.cookies
    // console.log(token);
    const verify_token = jwt.verify(token,"vishalbhagat2002")
    // console.log(verify_token);
    const admin_data = await LoginModel.findOne({_id:verify_token.id})
    // console.log(admin_data);
    req.admin = admin_data
       next()
   }
   catch(err){
    res.redirect('/');
   }
 }

module.exports = admin_auth