import { RequestHandler } from "express";
import ResponseService from "../../services/ResponseService";
import { UserRequest } from "../../types/Request";
import CarModel from "../../models/CarModel";

export const PurchaseCarController: RequestHandler = async (req, res) => {
  const userId = (req as UserRequest).userId;
  const carId = req.params["id"];

  const updatedCar = await CarModel.updateOne(
    { _id: carId },
    { $set: { ownerId: userId, isPurchaseAvailable: false } }
  );

  ResponseService.success(res, updatedCar);
};
