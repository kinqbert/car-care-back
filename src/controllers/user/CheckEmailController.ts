import { RequestHandler } from "express";
import ResponseService from "../../services/ResponseService";
import UserModel from "../../models/UserModel";

export const CheckEmailController: RequestHandler = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    ResponseService.error(res, "Email is required.", 400);
    return;
  }

  const userExists = !!(await UserModel.findOne({ where: { email } }));

  if (userExists) {
    ResponseService.error(res, "User with such email already exists.", 400);
    return;
  }

  ResponseService.success(res, { message: "Email is available!" }, 200);
};
