import { Express } from "express";
import AuthRoutes from "./AuthRoutes";

export default (app: Express) => {
  app.use(AuthRoutes());

  // This is default in case of unmatched routes
  app.use(function (req, res) {
    res.status(405).json({
      error: "Method not allowed",
    });
  });
};
