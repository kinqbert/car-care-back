import { RequestHandler } from "express";
import ResponseService from "../../services/ResponseService";
import UserModel from "../../models/UserModel";
import { UserRequest } from "../../types/Request";

export const UpdateUserController: RequestHandler = async (req, res) => {
  const userId = (req as UserRequest).userId;
  const { name, surname, licenseNumber, avatarUrl } = req.body;

  if (!name || !surname || !licenseNumber || !avatarUrl) {
    ResponseService.error(res, "Validation error", 400);
    return;
  }

  await UserModel.update(
    { name, surname, licenseNumber, avatarUrl },
    { where: { id: userId } }
  );

  ResponseService.success(
    res,
    { name, surname, licenseNumber, avatarUrl },
    200
  );
};
