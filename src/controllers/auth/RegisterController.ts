import { RequestHandler } from "express";
import ResponseService from "../../services/ResponseService";
import User from "../../models/UserModel";
import { hashPassword } from "../../services/UserServices";

export const RegisterController: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    ResponseService.error(res, "Email and password are required.", 400);
    return;
  }

  const userExists = !!(await User.findOne({ where: { email } }));

  if (userExists) {
    ResponseService.error(res, "User with such email already exists.", 400);
    return;
  }

  const encryptedPassword = await hashPassword(password);

  const user = await User.create({ email, password: encryptedPassword });

  ResponseService.success(
    res,
    { message: "User registered successfully!", user: { email } },
    200
  );
};
