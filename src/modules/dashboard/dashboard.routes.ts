import express from "express";
import * as controller from "./dashboard.controller";
import { authenticate } from "../../middleware/auth.middleware";

const router = express.Router();

router.get("/summary", authenticate, controller.summary);
router.get("/categories", authenticate, controller.categoryTotals);
router.get("/recent", authenticate, controller.recent);
router.get("/trends", authenticate, controller.trends);

export default router;