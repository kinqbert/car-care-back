import { Router } from "express";
import { ROUTES } from "../constants/routes";
import { CreateRepairController } from "../controllers/repairs/CreateRepairController";

export default () => {
  const route = Router();

  route.post(ROUTES.REPAIRS.CREATE, CreateRepairController);

  return route;
};
