import { Router } from "express";
import { createCompanyHandler } from "./company.controller";
import { authMiddleware } from "../../middleware/auth.middleware";
import { authorizeRoles } from "../../middleware/role.middleware";

const router = Router();

// Only company users can create company
router.post(
  "/",
  authMiddleware,
  authorizeRoles("company"),
  createCompanyHandler
);

export default router;