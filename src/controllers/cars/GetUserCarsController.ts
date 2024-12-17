import { RequestHandler } from "express";
import CarModel from "../../models/CarModel";
import ResponseService from "../../services/ResponseService";
import { UserRequest } from "../../types/Request";
import DamageModel from "../../models/DamageModel";

export const GetUserCarsController: RequestHandler = async (req, res) => {
  const userId = (req as UserRequest).userId;

  const cars = await CarModel.find({ ownerId: userId });
  const carIds = cars.map((car) => car._id);
  const damages = await DamageModel.find({
    car: { $in: carIds },
    isRepaired: false,
  });

  const populatedCars = cars.map((car) => {
    return {
      ...car.toObject(),
      damages: damages.filter(
        (damage) => damage.car.toString() === car._id.toString()
      ),
    };
  });

  ResponseService.success(res, populatedCars);
};
