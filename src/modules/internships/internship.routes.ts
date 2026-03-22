import { Router } from "express";
import { createInternshipHandler } from "./internship.controller";
import { authMiddleware } from "../../middleware/auth.middleware";
import { authorizeRoles } from "../../middleware/role.middleware";

const router = Router();

// Only companies can create internships
router.post(
  "/",
  authMiddleware,
  authorizeRoles("company"),
  createInternshipHandler
);

export default router;