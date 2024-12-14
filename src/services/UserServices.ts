import bcrypt from "bcryptjs";
import User from "../models/UserModel";
import CarModel from "../models/CarModel";
import CarSaleModel from "../models/CarSaleModel";

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};

export async function comparePassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export const createUser = async (email: string, password: string) => {
  const hashedPassword = await hashPassword(password);

  try {
    const user = await User.create({ email, password: hashedPassword });
    return user;
  } catch (error) {
    throw new Error("Error creating user.");
  }
};

export const getCarsOwnedByUser = async (userId: string) => {
  return await CarModel.find({ ownerId: userId }).countDocuments();
};

export const getUserSells = async (userId: string) => {
  return await CarSaleModel.find({ sellerId: userId }).countDocuments();
};
