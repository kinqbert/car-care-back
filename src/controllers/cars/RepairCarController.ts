import { RequestHandler } from "express";
import CarModel from "../../models/CarModel";
import ResponseService from "../../services/ResponseService";
import DamageModel from "../../models/DamageModel";

export const RepairCarController: RequestHandler = async (req, res) => {
  const carId = req.params["id"];

  const car = await CarModel.findOne({ _id: carId });

  if (!car) {
    ResponseService.error(res, "Car not found.");
    return;
  }

  await DamageModel.deleteMany({ car: carId });

  const updatedCar = {
    ...car.toObject(),
    damages: [],
  };

  ResponseService.success(res, updatedCar);
};
