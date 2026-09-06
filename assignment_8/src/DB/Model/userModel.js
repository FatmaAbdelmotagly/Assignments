import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    email : {
        type : String,
        unique : true ,
        require : true
    },
    password : {
        type : String,
        require : true
    },
    phone : {
        type : String,
        require : true
    },
    age : {
        type : Number,
        min : 18,
        max : 60
    },
})

export const UserModel = mongoose.model("User" , userSchema)