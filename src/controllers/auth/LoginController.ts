import { comparePassword } from "../../services/UserServices";
import UserModel from "../../models/UserModel";
import ResponseService from "../../services/ResponseService";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../services/TokenServices";
import redis from "../../lib/redis";
import CONFIG from "../../constants/config";
import { RequestHandler } from "express";

export const LoginController: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required." });
    return;
  }

  try {
    const user = await UserModel.findOne({ where: { email } });

    if (!user) {
      res.status(403).json({ message: "Invalid email or password." });
      return;
    }

    const isValidPassword = await comparePassword(password, user.password);

    if (!isValidPassword) {
      res.status(403).json({ message: "Invalid email or password." });
      return;
    }

    const refreshToken = generateRefreshToken({ id: user.id });
    const accessToken = generateAccessToken({ id: user.id });

    const id = user.id.toString();

    await redis.set(
      refreshToken,
      id,
      "EX",
      CONFIG.REFRESH_TOKEN_LIFESPAN_SECONDS
    );

    ResponseService.success(res, { refreshToken, accessToken });
  } catch {
    ResponseService.error(res, "Internal server error.", 500);
  }
};
