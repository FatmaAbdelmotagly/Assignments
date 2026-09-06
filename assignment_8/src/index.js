import ex from 'express';
import { PORT } from './config.js';
import{globalErrorHandling} from './middelWare/error.middleware.js'
import { bootStrap } from './DB/DBconnection.js';
import { userController } from './modules/user/index.js';
import { noteController } from './modules/note/index.js';

const app = ex();
console.log(process.env.NODE_ENV);
app.use(ex.json());
app.use("/user",userController)
app.use("/note",noteController)
bootStrap(app,PORT)


app.use(globalErrorHandling)

