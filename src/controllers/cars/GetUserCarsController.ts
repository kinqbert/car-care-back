import { RequestHandler } from "express";
import CarModel from "../../models/CarModel";
import ResponseService from "../../services/ResponseService";
import { UserRequest } from "../../types/Request";

export const GetUserCarsController: RequestHandler = async (req, res) => {
  const userId = (req as UserRequest).userId;

  const cars = await CarModel.find({ ownerId: userId });

  ResponseService.success(res, cars);
};
