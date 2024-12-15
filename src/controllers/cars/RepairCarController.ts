import { RequestHandler } from "express";
import CarModel from "../../models/CarModel";
import ResponseService from "../../services/ResponseService";
import RepairModel from "../../models/RepairsModel";

export const RepairCarController: RequestHandler = async (req, res) => {
  const carId = req.params["id"];

  const car = await CarModel.findOne({ _id: carId });

  if (!car) {
    ResponseService.error(res, "Car not found.");
    return;
  }

  await RepairModel.deleteMany({ carId });

  const updatedCar = {
    ...car.toObject(),
    repairs: [],
  };

  ResponseService.success(res, updatedCar);
};
