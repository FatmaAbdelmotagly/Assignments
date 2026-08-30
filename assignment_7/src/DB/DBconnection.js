import { MongoClient } from "mongodb";
import { DB_NAME, DB_URI } from "../config.js";

export const client = new MongoClient(DB_URI)

export const bootStrab =async (port , app) =>{
    try {
        await client.connect();
        console.log("DB connected 🌸");
  

        app.listen(port, ()=>{
            console.log(`server is running on port ${port} ❤️❤️`);
            
        })
        
    } catch (error) {
            console.log(error);
        console.log("fail to connect on DB");
        
    }

}

export const db = client.db(DB_NAME)