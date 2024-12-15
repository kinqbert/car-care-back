import { RequestHandler } from "express";
import ResponseService from "../../services/ResponseService";
import User from "../../models/UserModel";
import { UserRequest } from "../../types/Request";

export const UpdateUserController: RequestHandler = async (req, res) => {
  const userId = (req as UserRequest).userId;
  const { name, surname, licenseNumber, avatarUrl } = req.body;

  await User.update(
    { name, surname, licenseNumber, avatarUrl },
    { where: { id: userId } }
  );

  ResponseService.success(
    res,
    { name, surname, licenseNumber, avatarUrl },
    200
  );
};
