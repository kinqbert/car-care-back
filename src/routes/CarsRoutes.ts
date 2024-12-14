import { Router } from "express";
import { GetUserCarsController } from "../controllers/cars/GetUserCarsController";
import { GetAllCarsController } from "../controllers/cars/GetAllCarsController";
import { ROUTES } from "../constants/routes";

export default () => {
  const route = Router();

  route.get(ROUTES.CARS.GET_ALL, GetAllCarsController);
  route.get(ROUTES.CARS.GET_USER_CARS, GetUserCarsController);

  return route;
};
