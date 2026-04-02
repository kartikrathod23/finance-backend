import express from "express";
import * as controller from "./finance.controller";
import { authenticate } from "../../middleware/auth.middleware";
import { authorizeRoles } from "../../middleware/role.middleware";

const router = express.Router();

//CREATE (admin only)
router.post("/", authenticate, authorizeRoles("ADMIN"), controller.create);

//GET (for everyone)
router.get("/", authenticate, controller.getAll);

//UPDATE (admin only)
router.put("/:id", authenticate, authorizeRoles("ADMIN"), controller.update);

//DELETE (admin only)
router.delete("/:id", authenticate, authorizeRoles("ADMIN"), controller.remove);

export default router;