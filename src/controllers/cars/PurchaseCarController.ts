import { RequestHandler } from "express";
import ResponseService from "../../services/ResponseService";
import { UserRequest } from "../../types/Request";
import CarModel from "../../models/CarModel";
import CarSaleModel from "../../models/CarSaleModel";

export const PurchaseCarController: RequestHandler = async (req, res) => {
  const userId = (req as UserRequest).userId;
  const carId = req.params["id"];

  const car = await CarModel.findOne({ _id: carId });

  if (!car) {
    ResponseService.error(res, "Car not found.");
    return;
  }

  await CarSaleModel.create({
    carId,
    sellerId: car.ownerId,
    buyerId: userId,
  });

  car.ownerId = Number(userId);
  car.isPurchaseAvailable = false;

  const updatedCar = await car.save();

  ResponseService.success(res, updatedCar);
};
