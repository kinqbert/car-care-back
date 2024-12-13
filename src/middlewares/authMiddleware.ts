import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../services/TokenServices";
import ResponseService from "../services/ResponseService";

export function authenticateRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.method === "OPTIONS") {
    return next();
  }

  if (!req.headers["authorization"]) {
    return ResponseService.success(res, {
      message: "Authorization token required.",
    });
  }

  const authHeader = req.headers["authorization"] as string;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Authorization token required.");
  }

  const token = authHeader.split(" ")[1];

  try {
    verifyToken(token);
    next();
  } catch (error) {
    return ResponseService.error(res, "Invalid token. Please login.", 401);
  }
}
