import { RequestHandler } from "express";
import CarModel from "../../models/CarModel";
import ResponseService from "../../services/ResponseService";
import User from "../../models/UserModel";

export const GetAllCarsController: RequestHandler = async (req, res) => {
  const users = await User.findAll();
  const cars = await CarModel.find().lean();

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
