import { Router } from "express";
import { ROUTES } from "../constants/routes";
import { GetCurrentUserController } from "../controllers/user/GetCurrentUserController";

export default () => {
  const route = Router();

  route.get(ROUTES.USER.GET_USER, GetCurrentUserController);

  return route;
};
