import { RequestHandler } from "express";
import CarModel from "../../models/CarModel";
import ResponseService from "../../services/ResponseService";
import UserModel from "../../models/UserModel";
import TransactionModel from "../../models/TransactionModel";

export const GetAllTransactionsController: RequestHandler = async (
  req,
  res
) => {
  const transactions = await TransactionModel.find().lean();

  const cars = await CarModel.find().lean();
  const users = await UserModel.findAll({ raw: true });

  const populatedTransactions = transactions.map((transaction) => {
    const seller = users.find(
      (user) => user.id.toString() === transaction.seller
    );
    const buyer = users.find(
      (user) => user.id.toString() === transaction.buyer
    );

    const car = cars.find((car) => car._id.toString() === transaction.car);

    return {
      ...transaction,
      car: {
        ...car,
      },
      seller: {
        ...seller,
      },
      buyer: {
        ...buyer,
      },
    };
  });

  ResponseService.success(res, populatedTransactions);
};
