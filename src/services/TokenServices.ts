import jwt from "jsonwebtoken";
import CONFIG from "../constants/config";

export function generateRefreshToken(payload: object) {
  return jwt.sign(payload, CONFIG.REFRESH_TOKEN_SECRET!);
}

export function generateAccessToken(payload: object) {
  return jwt.sign(payload, CONFIG.ACCESS_TOKEN_SECRET!, {
    expiresIn: CONFIG.ACCESS_TOKEN_LIFESPAN,
  });
}

export function verifyAccessToken(token: string) {
  try {
    return jwt.verify(token, CONFIG.ACCESS_TOKEN_SECRET);
  } catch (error) {
    throw new Error("Invalid or expired token.");
  }
}

export function verifyRefreshToken(token: string) {
  try {
    return jwt.verify(token, CONFIG.REFRESH_TOKEN_SECRET);
  } catch (error) {
    throw new Error("Invalid or expired token.");
  }
}
