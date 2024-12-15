import { Router } from "express";
import { ROUTES } from "../constants/routes";
import { GetAllTransactionsController } from "../controllers/transactions/GetAllTransactionsController";

export default () => {
  const route = Router();

  route.get(
    ROUTES.TRANSACTIONS.GET_ALL_TRASACTIONS,
    GetAllTransactionsController
  );

  return route;
};
