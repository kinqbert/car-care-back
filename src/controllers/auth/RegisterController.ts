import { RequestHandler } from "express";
import { createUser } from "../../services/UserServices";
import ResponseService from "../../services/ResponseService";

export const RegisterController: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    ResponseService.error(res, "Email and password are required.", 400);
    return;
  }

  const user = await createUser(email, password);

  ResponseService.success(res, user);
};
