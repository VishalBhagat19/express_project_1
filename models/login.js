const mongoose = require("mongoose");

const LoginSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    image: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    role:{
      type: String,
      default:'user'
    }
  },
  { timestamps: true }
);

//create collection
const LoginModel = mongoose.model("log_in", LoginSchema);
//                                     ^ collection name

module.exports = LoginModel;
