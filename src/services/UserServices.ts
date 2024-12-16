import bcrypt from "bcryptjs";
import CarModel from "../models/CarModel";
import TransactionModel from "../models/TransactionModel";

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};

export async function comparePassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export const getCarsOwnedByUser = async (userId: string) => {
  return await CarModel.find({ ownerId: userId }).countDocuments();
};

export const getUserSells = async (userId: string) => {
  return await TransactionModel.find({ seller: userId }).countDocuments();
};
