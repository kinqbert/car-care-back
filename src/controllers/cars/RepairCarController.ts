import { RequestHandler } from "express";
import CarModel from "../../models/CarModel";
import ResponseService from "../../services/ResponseService";
import DamageModel from "../../models/DamageModel";
import RepairModel from "../../models/RepairModel";
import UserModel from "../../models/UserModel";

export const RepairCarController: RequestHandler = async (req, res) => {
  const carId = req.params["id"];

  const car = await CarModel.findOne({ _id: carId });

  if (!car) {
    ResponseService.error(res, "Car not found.");
    return;
  }

  const damages = await DamageModel.find({ car: carId, isRepaired: false });

  if (damages.length === 0) {
    ResponseService.error(res, "No damages to repair.");
    return;
  }

  await DamageModel.updateMany(
    { car: carId, isRepaired: false },
    { isRepaired: true }
  );

  await RepairModel.create({
    car: carId,
    damages: damages.map((damage) => damage._id),
  });

  const repairs = await RepairModel.find({ car: carId });
  const owner = await UserModel.findOne({ where: { id: Number(car.ownerId) } });

  const updatedCar = {
    ...car.toObject(),
    damages: [],
    repairs,
    owner,
  };

  ResponseService.success(res, updatedCar);
};
