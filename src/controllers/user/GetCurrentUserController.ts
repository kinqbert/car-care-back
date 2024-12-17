import { RequestHandler } from "express";
import ResponseService from "../../services/ResponseService";
import UserModel from "../../models/UserModel";
import { UserRequest } from "../../types/Request";
import { getCarsOwnedByUser, getUserSells } from "../../services/UserServices";

export const GetCurrentUserController: RequestHandler = async (req, res) => {
  const userId = (req as UserRequest).userId;
  const user = await UserModel.findOne({ where: { id: userId }, raw: true });
  const carsOwnedByUser = await getCarsOwnedByUser(userId);
  const userSells = await getUserSells(userId);

  ResponseService.success(res, {
    ...user,
    vehiclesOwned: carsOwnedByUser,
    vehiclesSold: userSells,
  });
};
