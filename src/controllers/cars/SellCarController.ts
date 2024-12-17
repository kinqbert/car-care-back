import { RequestHandler } from "express";
import CarModel from "../../models/CarModel";
import ResponseService from "../../services/ResponseService";
import DamageModel from "../../models/DamageModel";

export const SellCarController: RequestHandler = async (req, res) => {
  const carId = req.params["id"];

  const car = await CarModel.findOne({ _id: carId });

  if (!car) {
    ResponseService.error(res, "Car not found.");
    return;
  }

  car.isPurchaseAvailable = true;

  const updatedCar = await car.save();
  const damages = await DamageModel.find({ car: carId });

  const populatedCar = {
    ...updatedCar.toObject(),
    damages,
  };

  ResponseService.success(res, populatedCar);
};
