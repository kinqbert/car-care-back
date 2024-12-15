import { Router } from "express";
import { ROUTES } from "../constants/routes";
import { GetCurrentUserController } from "../controllers/user/GetCurrentUserController";
import { CheckEmailController } from "../controllers/user/CheckEmailController";
import { GetUsersController } from "../controllers/user/GetUsersController";
import { UpdateUserController } from "../controllers/user/UpdateUserController";

export default () => {
  const route = Router();

  route.get(ROUTES.USER.GET_USER, GetCurrentUserController);
  route.get(ROUTES.USER.GET_USERS, GetUsersController);
  route.patch(ROUTES.USER.CHECK_EMAIL, CheckEmailController);
  route.patch(ROUTES.USER.UPDATE, UpdateUserController);

  return route;
};
