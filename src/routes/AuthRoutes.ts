import { Router } from "express";
import { RegisterController } from "../controllers/auth/RegisterController";
import { LoginController } from "../controllers/auth/LoginController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { TokenController } from "../controllers/auth/TokenController";

const cars = [
  {
    id: "id1",
    make: "Toyota",
    model: "Corolla",
    year: 2018,
  },
  {
    id: "id2",
    make: "Toyota",
    model: "Camry",
    year: 2019,
  },
  {
    id: "id3",
    make: "Toyota",
    model: "Highlander",
    year: 2020,
  },
];

export default () => {
  const route = Router();

  route.post("/api/auth/register", RegisterController);
  route.post("/api/auth/login", LoginController);
  route.post("/api/auth/token", TokenController);

  route.get("/api/cars", (req, res) => {
    res.json(cars);
  });

  return route;
};
