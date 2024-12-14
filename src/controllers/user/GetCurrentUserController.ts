import { RequestHandler } from "express";
import ResponseService from "../../services/ResponseService";
import User from "../../models/UserModel";
import { UserRequest } from "../../types/Request";
import { getCarsOwnedByUser, getUserSells } from "../../services/UserServices";

export const GetCurrentUserController: RequestHandler = async (req, res) => {
  const userId = (req as UserRequest).userId;
  const user = await User.findOne({ where: { id: userId } });
  const carsOwnedByUser = await getCarsOwnedByUser(userId);
  const userSells = await getUserSells(userId);

  ResponseService.success(res, {
    id: user?.id || "",
    email: user?.email || "",
    vehiclesOwned: carsOwnedByUser,
    vehiclesSold: userSells,
  });
};
