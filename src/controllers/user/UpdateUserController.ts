import { RequestHandler } from "express";
import ResponseService from "../../services/ResponseService";
import UserModel from "../../models/UserModel";
import { UserRequest } from "../../types/Request";

export const UpdateUserController: RequestHandler = async (req, res) => {
  const userId = (req as UserRequest).userId;
  const { name, surname, licenseNumber, avatarUrl } = req.body;

  if (!name || !surname || !licenseNumber) {
    ResponseService.error(res, "Validation error", 400);
    return;
  }

  const userAvatar =
    avatarUrl ||
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541";

  await UserModel.update(
    { name, surname, licenseNumber, avatarUrl: userAvatar },
    { where: { id: userId } }
  );

  ResponseService.success(
    res,
    { name, surname, licenseNumber, avatarUrl: userAvatar },
    200
  );
};
