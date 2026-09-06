import { Router } from "express";
import {
  createProduct,
  getProductByID,
  getAllProducts,
  updateProduct,
  deleteProduct,
  addCategory,
  deleteCategory,
  changeContact,
  changeProductConstrain,
  insertproducts,
  updateBread,
  deleteEggs,
  highestStokQuentity,
  productNeverSold,
} from "./productService.js";
import { successResponse } from "../../common/utils/success.response.js";
const router = Router();
/////////////////--->DDL

router.patch("/column/create", async (req, res, next) => {
  await addCategory();
  return successResponse({ res, message: "column created", status: 201 });
});
router.delete("/column", async (req, res, next) => {
  await deleteCategory();
  res.status(201).json({ message: "column category deleted " });
});
router.patch("/columnType", async (req, res, next) => {
  await changeContact();
  res.status(201).json({ message: "column category changed to varchar" });
});
router.patch("/column/Constrain", async (req, res, next) => {
  await changeProductConstrain();
  res.status(201).json({ message: "column category set to be not null " });
});

router.post("/", async (req, res, next) => {
  const product = await createProduct(req.body);
  res.status(201).json({ message: "product created" });
});
router.get("/highestStock", async (req, res, next) => {
  const products = await highestStokQuentity();

  res.status(201).json({ products });
});
router.get("/neverSold", async (req, res, next) => {
  const products = await productNeverSold();

  res.status(201).json({ products });
});
router.get("/", async (req, res, next) => {
  const products = await getAllProducts();
  res.status(200).json({ products });
});
router.get("/:ProductID", async (req, res, next) => {
  const product = await getProductByID(req.params);
  res.status(200).json({ product });
});
router.patch("/:ProductID", async (req, res, next) => {
  const product = await updateProduct(req);
  res.status(200).json({ product });
});
router.delete("/{:ProductID}", async (req, res, next) => {
  const product = await deleteProduct(req.params || req.body);
  res.status(200).json({ message: "product deleted" });
});
router.post("/initialize", async (req, res, next) => {
  const product = await insertproducts(req.body);
  res.status(201).json({ message: "products inserted" });
});
router.patch("/", async (req, res, next) => {
  await updateBread(req.body);
  res.status(201).json({ message: "bread updated" });
});
router.delete("/delete/Eggs", async (req, res, next) => {
  await deleteEggs();

  res.status(201).json({ message: "Eggs deleted" });
});

export default router;
