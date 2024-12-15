import { RequestHandler } from "express";
import CarModel from "../../models/CarModel";
import ResponseService from "../../services/ResponseService";
import { UserRequest } from "../../types/Request";
import RepairModel from "../../models/RepairsModel";

export const GetUserCarsController: RequestHandler = async (req, res) => {
  const userId = (req as UserRequest).userId;

  const cars = await CarModel.find({ ownerId: userId });
  const carIds = cars.map((car) => car._id);
  const repairs = await RepairModel.find({ carId: { $in: carIds } });

  const populatedCars = cars.map((car) => {
    return {
      ...car.toObject(),
      repairs: repairs.filter(
        (repair) => repair.carId.toString() === car._id.toString()
      ),
    };
  });

  ResponseService.success(res, populatedCars);
};
