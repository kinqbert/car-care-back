import { RequestHandler } from "express";
import ResponseService from "../../services/ResponseService";
import UserModel from "../../models/UserModel";

export const GetUsersController: RequestHandler = async (req, res) => {
  const users = await UserModel.findAll({ raw: true });

  ResponseService.success(res, users);
};
