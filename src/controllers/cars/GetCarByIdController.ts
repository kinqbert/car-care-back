import { RequestHandler } from "express";
import CarModel from "../../models/CarModel";
import ResponseService from "../../services/ResponseService";
import DamageModel from "../../models/DamageModel";
import User from "../../models/UserModel";

export const GetCarByIdController: RequestHandler = async (req, res) => {
  const carId = req.params.id;

  if (!carId.match(/^[0-9a-fA-F]{24}$/)) {
    ResponseService.error(res, "Car not found", 404);

    return;
  }

  const car = await CarModel.findById(carId);

  if (!car) {
    ResponseService.error(res, "Car not found", 404);

    return;
  }

  const owner = await User.findByPk(car.ownerId, { raw: true });
  const damages = await DamageModel.find({ car: carId });

  const populatedCar = {
    ...car.toObject(),
    owner,
    damages,
  };

  ResponseService.success(res, populatedCar);
};
