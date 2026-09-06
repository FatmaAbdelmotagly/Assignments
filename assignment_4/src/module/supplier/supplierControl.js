import { Router } from "express";
import {
  createSupplier,
  getAllSuppliers,
  updateSupplier,
  deleteSupplier,
  insertFreshFoodSupplier,
  supStartWithF,
} from "./supplierService.js";
const router = Router();

router.post("/", (req, res, next) => {
  const supplier = createSupplier(req.body);
  return res.status(201).json({ message: "supplier added" });
});
router.get("/", async (req, res, next) => {
  const suppliers = await getAllSuppliers();
  return res.status(201).json(suppliers);
});
router.get("/startWithF", async (req, res, next) => {
  const suppliers = await supStartWithF();
  return res.status(201).json(suppliers);
});
router.patch("/:SupplierID", async (req, res, next) => {
  const supplier = await updateSupplier(req);
  return res.status(201).json({ message: "supplier updated ", supplier });
});
router.delete("/:SupplierID", async (req, res, next) => {
  const supplier = await deleteSupplier(req.params);
  return res.status(201).json({ message: "supplier deleted" });
});
router.post("/initialize", async (req, res, next) => {
  const supplier = await insertFreshFoodSupplier();
  return res.status(201).json({ message: "supplier fresh foods created" });
});

export default router;
