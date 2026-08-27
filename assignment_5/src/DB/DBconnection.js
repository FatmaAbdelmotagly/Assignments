import { Sequelize } from 'sequelize';
import{DB_HOST,DB_PASSWORD,DB_PORT,DB_USER,DB_NAME}from '../config.js'

export const sequelize = new Sequelize(DB_NAME,DB_USER , DB_PASSWORD,{
     port:DB_PORT, 
     host :DB_HOST,
     dialect:'mysql',
     pool :{
        max:5,
        min:0
    }
})

export const bootstrap = (port,app)=>{
    try {
        sequelize.authenticate();
        sequelize.sync({alter : false , force :false});
        console.log("DB connected 😘");
        app.listen(port,()=>{console.log(`server is runnin on port ${port} 🌸`);
    })
    } catch (error) {
        
        console.log("faild to connect on DB 😤");
        process.exit(1);
    }


}