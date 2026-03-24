import { Router } from "express";
import { applyHandler } from "./application.controller";
import { authMiddleware } from "../../middleware/auth.middleware";
import { authorizeRoles } from "../../middleware/role.middleware";

const router = Router();

// Only students can apply
router.post(
  "/",
  authMiddleware,
  authorizeRoles("student"),
  applyHandler
);

export default router;