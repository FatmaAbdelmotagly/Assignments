//بيستلم ال http req  و يرجع ال res
import { Router } from "express";
import {
  createSale,
  getAllSales,
  getSaleByID,
  sale2Mile,
  getAllQuantitySold,
  getAllSalesAndProductName,
} from "./saleService.js";
const router = Router();

router.post("/", async (req, res, next) => {
  const data = await createSale(req.body);
  return res.status(201).json({ message: "sale created " });
});
router.get("/", async (req, res, next) => {
  const data = await getAllSales();
  return res.status(200).json({ data });
});
router.get("/allSalesAndProducts", async (req, res, next) => {
  const data = await getAllSalesAndProductName();
  return res.status(200).json({ data });
});

router.get("/:ProductID", async (req, res, next) => {
  const data = await getSaleByID(req.params);
  return res.status(200).json({ data });
});
router.post("/initialize", async (req, res, next) => {
  const data = await sale2Mile(req.params);
  return res.status(201).json({ message: "2 milk sold" });
});
router.get("/product/quentitySold", async (req, res, next) => {
  const data = await getAllQuantitySold();

  return res.status(201).json({ data });
});

export default router;
