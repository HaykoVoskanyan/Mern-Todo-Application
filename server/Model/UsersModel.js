const { default: mongoose } = require("mongoose");




const usersSchema  = mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true,
    unique:true,
  },
  address:{
    type:String,
    required:true
  }
})


module.exports = mongoose.model("user",usersSchema)