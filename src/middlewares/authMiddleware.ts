import { Request, Response } from "express";
import { verifyAccessToken } from "../services/TokenServices";
import ResponseService from "../services/ResponseService";
import { UserRequest } from "../types/Request";

export function authMiddleware(req: Request, res: Response, next: any) {
  if (req.method === "OPTIONS") {
    return next();
  }

  if (
    req.originalUrl.includes("login") ||
    req.originalUrl.includes("register") ||
    req.originalUrl.includes("token") ||
    req.originalUrl.includes("check_email")
  ) {
    return next();
  }

  if (!req.headers["authorization"]) {
    return ResponseService.error(res, "Authorization token required.", 401);
  }

  const authHeader = req.headers["authorization"] as string;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Authorization token required.");
  }

  const token = authHeader.split(" ")[1];

  try {
    const { id } = verifyAccessToken(token) as { id: string };
    (req as UserRequest).userId = id;
    next();
  } catch (error) {
    return ResponseService.error(res, "Invalid token. Please login.", 401);
  }
}
