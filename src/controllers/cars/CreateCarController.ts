import { RequestHandler } from "express";
import CarModel from "../../models/CarModel";
import ResponseService from "../../services/ResponseService";
import { UserRequest } from "../../types/Request";

export const CreateCarController: RequestHandler = async (req, res) => {
  const userId = (req as UserRequest).userId;

  const car = await CarModel.create({
    ...req.body,
    repairs: [],
    ownerId: userId,
  });

  ResponseService.success(res, car);
};
