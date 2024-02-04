const mongoose=require('mongoose')
const Schema=mongoose.Schema

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  
    avatar: {
      type: String,
    },
    userrole: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    contactNo: {
      type: Number,
    },
    cartID: {
      type:Number,
    },
    registerType:{
      type:String,
      required:true,
      default:"Auth"

    },
    
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

  


const User=mongoose.model("User",userSchema)
module.exports=User;