import { Express } from "express";
import AuthRoutes from "./AuthRoutes";
import CarsRoutes from "./CarsRoutes";
import UserRoutes from "./UserRoutes";
import DamagesRoutes from "./DamagesRoutes";
import TransactionRoutes from "./TransactionRoutes";

export default (app: Express) => {
  app.use(AuthRoutes());
  app.use(CarsRoutes());
  app.use(UserRoutes());
  app.use(DamagesRoutes());
  app.use(TransactionRoutes());

  // This is default in case of unmatched routes
  app.use(function (req, res) {
    res.status(405).json({
      error: "Method not allowed",
    });
  });
};
