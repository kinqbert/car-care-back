import { RequestHandler } from "express";
import CarModel from "../../models/CarModel";
import ResponseService from "../../services/ResponseService";
import { UserRequest } from "../../types/Request";
import TransactionModel from "../../models/TransactionModel";
import DamageModel from "../../models/DamageModel";
import RepairModel from "../../models/RepairModel";

export const DeleteCarController: RequestHandler = async (req, res) => {
  const carId = req.params.id;
  const userId = (req as UserRequest).userId;

  if (!carId.match(/^[0-9a-fA-F]{24}$/)) {
    ResponseService.error(res, "Car not found", 404);

    return;
  }

  const car = await CarModel.findById(carId);

  if (!car) {
    ResponseService.error(res, "Car not found", 404);

    return;
  }

  console.log(car.ownerId);
  console.log(userId);

  if (car.ownerId !== Number(userId)) {
    ResponseService.error(res, "Unauthorized", 401);

    return;
  }

  await car.deleteOne();
  await TransactionModel.deleteMany({ car: carId });
  await DamageModel.deleteMany({ car: carId });
  await RepairModel.deleteMany({ car: carId });

  ResponseService.success(res, {}, 204);
};
