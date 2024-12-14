import CONFIG from "../../constants/config";
import redis from "../../lib/redis";
import ResponseService from "../../services/ResponseService";
import { generateAccessToken } from "../../services/TokenServices";
import { UserRequestHandler } from "../../types/Request";
import jwt from "jsonwebtoken";

export const TokenController: UserRequestHandler = async (req, res) => {
  const refreshToken = req.body.refreshToken;

  const userId = await redis.get(refreshToken);

  if (!userId) {
    ResponseService.error(res, "Invalid refresh token.", 403);
    return;
  }

  jwt.verify(
    refreshToken,
    CONFIG.REFRESH_TOKEN_SECRET,
    (err: any, user: any) => {
      if (err) {
        return ResponseService.error(res, "Invalid refresh token.", 403);
      }

      const accessToken = generateAccessToken({ id: user.id });

      ResponseService.success(res, { accessToken });
    }
  );
};
