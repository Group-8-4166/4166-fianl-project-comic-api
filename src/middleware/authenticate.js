import jwt from "jsonwebtoken";
import { isBlacklisted } from "../config/tokenBlacklist.js";

const JWT_SECRET = process.env.JWT_SECRET;

export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    const err = new Error("You are not authenticated");
    err.status = 401;
    return next(err);
  }
  const token = authHeader.split(" ")[1];

  if (isBlacklisted(token)) {
    const err = new Error("Token is invalid or expired. Please log in again.");
    err.status = 401;
    return next(err);
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const id = Number(payload.id);

    if (Number.isNaN(id)) {
      const err = new Error("Invalid token payload");
      err.status = 401;
      return next(err);
    }

    req.user = { id, role: payload.role };
    next();
  } catch (e) {
    const err = new Error("You are not authenticated");
    err.status = 401;
    return next(err);
  }
}
