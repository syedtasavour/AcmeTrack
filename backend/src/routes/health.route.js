import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();
import {
  addHealthLog,
  getHealthStatus,
  getRecentHealthLogs,
  getTodaysSummary,
  getTotalWeightLoss,
  calculateBMI,
  getWeeklyWeightChange,
  getBloodPressureRecords,
} from "../controllers/health.controller.js";

router.route("/add-health-log").post(verifyJWT, addHealthLog);
router.route("/recent-health-log").get(verifyJWT, getRecentHealthLogs);
router.route("/today-summary").get(verifyJWT, getTodaysSummary);
router.route("/health-status").get(verifyJWT, getHealthStatus);
router.route("/total-weight-loss").get(verifyJWT, getTotalWeightLoss);
router.route("/calculate-bmi").get(verifyJWT, calculateBMI);
router.route("/weekly-weight").get(verifyJWT, getWeeklyWeightChange);
router.route("/blood-pressure").get(verifyJWT, getBloodPressureRecords);

export default router;
