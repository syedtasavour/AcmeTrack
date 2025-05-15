import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();
import {
  getRecentShipment,
  getShipments,
} from "../controllers/shipment.controller.js";

router.route("/").get(verifyJWT, getShipments);
router.route("/recent").get(verifyJWT, getRecentShipment);

export default router;
