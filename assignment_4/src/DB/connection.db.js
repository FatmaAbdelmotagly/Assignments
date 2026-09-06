     
import mySql2 from 'mysql2/promise';

import { DB_HOST, DB_PASSWORD, DB_PORT, DB_USER,DB } from '../config.js';

let db = mySql2.createPool({
    host:DB_HOST,
    port:DB_PORT,
    user:DB_USER,
    password:DB_PASSWORD,
    database:DB,

    waitForConnections : true,
    queueLimit : 0,
    connectionLimit :4
}) 

async function bootStrap(port,app){
        try {
        console.log("DB connected ");
        app.listen(port,()=>{
    console.log(`server is running on port ${port}`)});

        
        } catch (error) {
        console.log("faild to connect on DB ");
        process.exit(1)
            
        }
    
}
export {bootStrap,db}



