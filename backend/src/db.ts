import mongoose, { mongo } from "mongoose";
import { connectionString } from "./config";
try{
    mongoose.connect(connectionString)
}catch(err){
    console.log("Error in connecting MongoDB", err);    
}

const userScheme = new mongoose.Schema({
    username :  {
        type : String,
        unique : true,
        required : true,
        maxlength : 50,
        trim : true,
    },
    password :  {
        type : String,
        required : true,
        maxlength : 100,
        minlength : 8,
        trim : true,
    }
})



const linkSchema = new mongoose.Schema({
    hash : {
        type : String,
        required : true,
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "User",
        required : true
    }
})

const contentTypes = ["image", "video", "article", "audio"];

const contentSchema = new mongoose.Schema({
    type : {
        type  : String,
        required : true,
    },
    link : {
        type : String,
        required : true,
    },
    title : {
        type : String,
        required : true,
        enum : contentTypes,
    },
    tags : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Tag"
    }],
    userId :{
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "User"
    }
})
const tagsSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        unique : true
    }
})
export const Link = mongoose.model("Link", linkSchema)
export const Tag = mongoose.model("Tag", tagsSchema)
export const Content = mongoose.model("Content", contentSchema)
export const User = mongoose.model("User", userScheme)