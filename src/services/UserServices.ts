import bcrypt from "bcryptjs";
import User from "../models/UserModel";

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
