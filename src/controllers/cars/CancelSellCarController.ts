import { RequestHandler } from "express";
import CarModel from "../../models/CarModel";
import ResponseService from "../../services/ResponseService";
import DamageModel from "../../models/DamageModel";

export const CancelSellCarController: RequestHandler = async (req, res) => {
  const carId = req.params["id"];

  const car = await CarModel.findOne({ _id: carId });

  if (!car) {
    ResponseService.error(res, "Car not found.");
    return;
  }

  car.isPurchaseAvailable = false;

  const updatedCar = await car.save();
  const damages = await DamageModel.find({ car: carId, isRepaired: false });

  const populatedCar = {
    ...updatedCar.toObject(),
    damages: damages,
  };

  ResponseService.success(res, populatedCar);
};
