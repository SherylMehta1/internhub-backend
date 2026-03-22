import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
  role: string;
}

export const authMiddleware = (
  req: Request & { user?: JwtPayload },
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ message: "No token provided" });
  }

  const parts = header.split(" ");

if (parts.length !== 2 || parts[0] !== "Bearer") {
  return res.status(401).json({ message: "Invalid token format" });
}

const token = parts[1];

if (!token) {
  return res.status(401).json({ message: "Token missing" });
}

//  Force secret as string safely
const secret: string = process.env.JWT_SECRET as string;

if (!secret) {
  throw new Error("JWT_SECRET is not defined");
}
  try {
    const decoded = jwt.verify(token, secret);

    if (typeof decoded === "string") {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};