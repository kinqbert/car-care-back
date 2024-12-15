import { RequestHandler } from "express";
import CarModel from "../../models/CarModel";
import ResponseService from "../../services/ResponseService";
import User from "../../models/UserModel";
import { UserRequest } from "../../types/Request";

export const GetAllCarsController: RequestHandler = async (req, res) => {
  const userId = (req as UserRequest).userId;

  const users = await User.findAll();
  const cars = await CarModel.find({
    ownerId: { $not: { $eq: userId } },
    isPurchaseAvailable: true,
  }).lean();

  const populatedCars = cars.map((car) => {
    const user = users.find((user) => user.id === car.ownerId);
    return {
      ...car,
      owner: {
        id: user?.id,
        email: user?.email,
      },
    };
  });

  ResponseService.success(res, populatedCars);
};
