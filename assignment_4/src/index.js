import { globalErrorHandling } from "./middleware/index.js";
import {
  saleControl,
  supplierControl,
  productControl,
  adminController,
} from "./module/index.js";
import { bootStrap } from "./DB/connection.db.js";
import ex from "express";
import { PORT } from "./config.js";

const app = ex();

console.log(process.env.node_Env);

app.use(ex.json());
app.use("/sale", saleControl);
app.use("/products", productControl);
app.use("/supplier", supplierControl);
app.use("/admin", adminController);
app.use(globalErrorHandling);
bootStrap(PORT, app);

app.all("{/*dummy}", (req, res, next) => {
  return res.status(404).json({ message: "invalid application routing" });
});
