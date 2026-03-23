import { Router } from "express";
import { createInternshipHandler } from "./internship.controller";
import { authMiddleware } from "../../middleware/auth.middleware";
import { authorizeRoles } from "../../middleware/role.middleware";
import { getInternshipsHandler } from "./internship.controller";

const router = Router();

// Only companies can create internships
router.post(
  "/",
  authMiddleware,
  authorizeRoles("company"),
  createInternshipHandler
);

// Accessing internships Public route (no auth needed)
router.get("/", getInternshipsHandler);

export default router;