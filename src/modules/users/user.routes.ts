import { Router } from "express";
import { register, login } from "./user.controller";
import { authMiddleware } from "../../middleware/auth.middleware";
import { authorizeRoles } from "../../middleware/role.middleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);

// Protected route
router.get("/me", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: (req as any).user,
  });
});

// Only students allowed
router.get(
  "/student-only",
  authMiddleware,
  authorizeRoles("student"),
  (req, res) => {
    res.json({ message: "Welcome student" });
  }
);

// Only companies allowed
router.get(
  "/company-only",
  authMiddleware,
  authorizeRoles("company"),
  (req, res) => {
    res.json({ message: "Welcome company" });
  }
);

export default router;