import { RequestHandler } from "express";
import CarModel from "../../models/CarModel";
import ResponseService from "../../services/ResponseService";
import DamageModel from "../../models/DamageModel";
import UserModel from "../../models/UserModel";
import RepairModel from "../../models/RepairModel";
import TransactionModel from "../../models/TransactionModel";

export const GetCarByIdController: RequestHandler = async (req, res) => {
  const carId = req.params.id;

  if (!carId.match(/^[0-9a-fA-F]{24}$/)) {
    ResponseService.error(res, "Car not found", 404);

    return;
  }

  const car = await CarModel.findById(carId);

  if (!car) {
    ResponseService.error(res, "Car not found", 404);

    return;
  }

  const owner = await UserModel.findByPk(car.ownerId, { raw: true });
  const damages = await DamageModel.find({ car: carId, isRepaired: false });
  const foundRepairs = await RepairModel.find({ car: carId });
  const foundTransactions = await TransactionModel.find({ car: carId });
  const sortedTransactions = foundTransactions.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const owners = [];

  for (const transaction of sortedTransactions) {
    const foundOwner = await UserModel.findByPk(transaction.seller, {
      raw: true,
    });

    if (!foundOwner) {
      continue;
    }

    let from = null;
    const to = transaction.date;

    const index = sortedTransactions.indexOf(transaction);

    if (index === 0) {
      from = car.createdAt;
    } else {
      const previousTransaction = sortedTransactions[index - 1];
      from = previousTransaction.date;
    }

    const owner = {
      id: foundOwner.id,
      surname: foundOwner.surname,
      name: foundOwner.name,
      licenseNumber: foundOwner.licenseNumber,
      avatarUrl: foundOwner.avatarUrl,
      from: from,
      to: to,
    };

    owners.push(owner);
  }

  for (const repair of foundRepairs) {
    await repair.populate({ path: "damages" });
  }

  const populatedCar = {
    ...car.toObject(),
    owner,
    damages,
    owners,
    repairs: foundRepairs,
  };

  ResponseService.success(res, populatedCar);
};
