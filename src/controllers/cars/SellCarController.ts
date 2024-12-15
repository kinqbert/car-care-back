import { RequestHandler } from "express";
import CarModel from "../../models/CarModel";
import ResponseService from "../../services/ResponseService";
import RepairModel from "../../models/RepairsModel";

export const SellCarController: RequestHandler = async (req, res) => {
  const carId = req.params["id"];

  const car = await CarModel.findOne({ _id: carId });

  if (!car) {
    ResponseService.error(res, "Car not found.");
    return;
  }

  car.isPurchaseAvailable = true;

  const updatedCar = await car.save();
  const repairs = await RepairModel.find({ carId });

  const populatedCar = {
    ...updatedCar.toObject(),
    repairs,
  };

  ResponseService.success(res, populatedCar);
};
