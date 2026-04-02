import express from "express";
import * as controller from "./user.controller";
import { authenticate } from "../../middleware/auth.middleware";
import { authorizeRoles } from "../../middleware/role.middleware";

const router = express.Router();

//(admin only)
router.get("/", authenticate, authorizeRoles("ADMIN"), controller.getUsers);
router.put("/:id/role", authenticate, authorizeRoles("ADMIN"), controller.updateRole);
router.put("/:id/status", authenticate, authorizeRoles("ADMIN"), controller.toggleStatus);

export default router;