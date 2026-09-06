import { Router } from "express";
import {
  createStoreManager,
  grantDeleteSales,
  revokeUpdate,
} from "./adminService.js";
const router = Router();

router.post("/create-manager", async (req, res, next) => {
  const message = await createStoreManager();

  res.status(201).json({ message });
});
router.post("/revoke-update", async (req, res, next) => {
  const message = await revokeUpdate();
  res.status(200).json({ message });
});

router.post("/grant-delete-sales", async (req, res, next) => {
  const message = await grantDeleteSales();
  res.status(200).json({ message });
});
export default router;
