import { Router } from "express";
import { GetUserCarsController } from "../controllers/cars/GetUserCarsController";
import { GetAllCarsController } from "../controllers/cars/GetAllCarsController";
import { ROUTES } from "../constants/routes";
import { PurchaseCarController } from "../controllers/cars/PurchaseCarController";

export default () => {
  const route = Router();

  route.get(ROUTES.CARS.GET_ALL, GetAllCarsController);
  route.get(ROUTES.CARS.GET_USER_CARS, GetUserCarsController);
  route.patch(ROUTES.CARS.PURCHASE, PurchaseCarController);

  return route;
};
