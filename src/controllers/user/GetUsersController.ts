import { RequestHandler } from "express";
import ResponseService from "../../services/ResponseService";
import User from "../../models/UserModel";

export const GetUsersController: RequestHandler = async (req, res) => {
  const users = await User.findAll({ raw: true });

  ResponseService.success(res, users);
};
