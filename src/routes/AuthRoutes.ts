import { Router } from "express";
import { RegisterController } from "../controllers/auth/RegisterController";
import { LoginController } from "../controllers/auth/LoginController";
import { TokenController } from "../controllers/auth/TokenController";

export default () => {
  const route = Router();

  route.post("/api/auth/register", RegisterController);
  route.post("/api/auth/login", LoginController);
  route.post("/api/auth/token", TokenController);

  return route;
};
