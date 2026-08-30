import ex from 'express';
import { PORT } from './config.js';
import{globalErrorHandling} from './middelWare/error.middleware.js'
import { bootStrab } from './DB/DBconnection.js';

import { bookController } from './modules/book/index.js';
import { authorController } from './modules/authors/index.js';
import { logController } from './modules/logs/index.js';

const app = ex();
console.log(process.env.NODE_ENV);
app.use(ex.json());

app.use("/collections",bookController,authorController)
app.use("/books",bookController)
app.use("/logs",logController)
bootStrab(PORT,app)


app.use(globalErrorHandling)

