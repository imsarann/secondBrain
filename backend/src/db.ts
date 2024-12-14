import mongoose from "mongoose";
import { connectionString } from "./config";
try{
    mongoose.connect(connectionString)
}catch(err){
    console.log("Error in connecting MongoDB", err);    
}

const userScheme = new mongoose.Schema({
    firsName :  {
        type : String,
        required : true,
        maxlength : 50,
        trim : true,
    },
    lastName :  {
        type : String,
        required : true,
        maxlength : 50,
        trim : true,
    },
    email : {
        type : String,
        required : true,
        lowercase: true,
        unique : true,
        trim : true,
        maxlength : 100,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    }
})


export const User = mongoose.model("User", userScheme)