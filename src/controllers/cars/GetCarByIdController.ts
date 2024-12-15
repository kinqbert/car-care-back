import { RequestHandler } from "express";
import CarModel from "../../models/CarModel";
import ResponseService from "../../services/ResponseService";
import RepairModel from "../../models/RepairsModel";
import User from "../../models/UserModel";

export const GetCarByIdController: RequestHandler = async (req, res) => {
  const carId = req.params.id;

  const car = await CarModel.findById(carId);

  if (!car) {
    ResponseService.error(res, "Car not found", 404);

    return;
  }

  const owner = await User.findByPk(car.ownerId, { raw: true });
  const repairs = await RepairModel.find({ car: carId });

  const populatedCar = {
    ...car.toObject(),
    owner,
    repairs,
  };

  ResponseService.success(res, populatedCar);
};
