import mongoose from "mongoose";
import { connectionString } from "./config";
try{
    mongoose.connect(connectionString)
}catch(err){
    console.log("Error in connecting MongoDB", err);    
}

const userScheme = new mongoose.Schema({
    username :  {
        type : String,
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


export const User = mongoose.model("User", userScheme)