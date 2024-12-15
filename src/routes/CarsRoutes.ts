import { Router } from "express";
import { GetUserCarsController } from "../controllers/cars/GetUserCarsController";
import { GetAllCarsController } from "../controllers/cars/GetAllCarsController";
import { ROUTES } from "../constants/routes";
import { PurchaseCarController } from "../controllers/cars/PurchaseCarController";
import { SellCarController } from "../controllers/cars/SellCarController";
import { CancelSellCarController } from "../controllers/cars/CancelSellCarController";
import { RepairCarController } from "../controllers/cars/RepairCarController";
import { CreateCarController } from "../controllers/cars/CreateCarController";

export default () => {
  const route = Router();

  route.get(ROUTES.CARS.GET_ALL, GetAllCarsController);
  route.get(ROUTES.CARS.GET_USER_CARS, GetUserCarsController);
  route.post(ROUTES.CARS.CREATE, CreateCarController);
  route.patch(ROUTES.CARS.PURCHASE, PurchaseCarController);
  route.patch(ROUTES.CARS.SELL, SellCarController);
  route.patch(ROUTES.CARS.CANCEL_SELL, CancelSellCarController);
  route.patch(ROUTES.CARS.REPAIR, RepairCarController);

  return route;
};
