const mongoose = require("mongoose");

const BtechSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      require: true,
    },
    phone: {
      type: Number,
      require: true,
    },
    gender:{
        type:String,
        require:true,
    },
    dob:{
        type:Date,
        require:true,
    },
    address:{
        type:String,
        require:true,
    },
    college:{
        type:String,
        require:true,
    },
    course:{
      type:String,
     require:true,
    },
    branch:{
        type:String,
        require:true,
    },
    user_id:{
      type:String,
      require:true,
    },
    status:{
      type:String,
     default:'pending'
    },
    comment:{
      type:String,
     default:'pending'
    }



  },
  { timestamps: true }
);

//create collection
const BtechModel = mongoose.model("btech", BtechSchema);
//                                     ^ collection name

module.exports = BtechModel;
