import { comparePassword } from "../../services/UserServices";
import User from "../../models/UserModel";
import ResponseService from "../../services/ResponseService";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../services/TokenServices";
import { UserRequestHandler } from "../../types/Request";
import redis from "../../lib/redis";
import CONFIG from "../../constants/config";

export const LoginController: UserRequestHandler = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required." });
    return;
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      res.status(400).json({ message: "Such user does not exist." });
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
