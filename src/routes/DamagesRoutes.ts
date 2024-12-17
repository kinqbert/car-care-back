import { Router } from "express";
import { ROUTES } from "../constants/routes";
import { CreateDamageController } from "../controllers/damages/CreateDamageController";

export default () => {
  const route = Router();

  route.post(ROUTES.DAMAGE.CREATE, CreateDamageController);

  return route;
};
