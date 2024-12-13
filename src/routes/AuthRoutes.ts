import { Router } from "express";
import { API_ROUTES } from "../constants/Routes";
import { RegisterController } from "../controllers/auth/RegisterController";

export default () => {
  const route = Router();

  route.post(API_ROUTES.AUTH.REGISTER, RegisterController);

  return route;
};
