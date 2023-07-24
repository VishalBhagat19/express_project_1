const contactModel = require("../models/contact.js");

class ContactController{




    // static contact=async(req,res)=>{
    //         try{
    //             const{name,image}=req.admin
    //             // const data= await contactModel.find()
    //             res.render('college/contact',{n:name,i:image})
    //         }catch(err){
    //             console.log(err)
    //             }
    //         }
        

  
    static contactinsert=async(req,res)=>{
        try{
             const result=new contactModel({
                name:req.body.name,
                email:req.body.email,
                phone:req.body.phone,
                message:req.body.message
             })
              await result.save()
              res.redirect('/contact')
        }
        catch(err){
            console.log(err)
        }
    }
    static contactview = async(req,res)=>{
        try{
            const{name,image}=req.admin
            const data = await contactModel.find()
            res.render('admin/college/contact/contact',{ r: name, s: image, f: data })
        }
        catch(err){
            console.log(err);
        }
    }
    

}
module.exports = ContactController