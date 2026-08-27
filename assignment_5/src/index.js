import ex from 'express';
import { PORT } from './config.js';
import{globalErrorHandling} from './middelWare/error.middleware.js'
import { bootstrap } from './DB/DBconnection.js';
import { userController } from './modules/User/index.js';
import { postController } from './modules/Posts/index.js';
import { commentController } from './modules/Comments/index.js';

const app = ex();
console.log(process.env.NODE_ENV);
app.use(ex.json());
app.use("/user",userController)
app.use("/post",postController)
app.use("/comment",commentController)

bootstrap(PORT,app)


app.use(globalErrorHandling)

