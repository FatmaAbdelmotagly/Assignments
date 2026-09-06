import mongoose from "mongoose";
import { DB_URI } from "../config.js";
import { UserModel } from "./Model/userModel.js";

 export const bootStrap = async(app, port)=>{
    try {
        await mongoose.connect(DB_URI)
        await UserModel.syncIndexes();
        console.log("DB connected 🌸");
        app.listen(port,()=>{
            console.log(`server is running on port ${port}` );
        })
        
    } catch (error) {
        console.log(error);
        
        console.log("fail to connect on DB 😤");
        
    }
 }