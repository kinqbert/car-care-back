import { RequestHandler } from "express";
import { comparePassword, createUser } from "../../services/UserServices";
import User from "../../models/UserModel";
import { generateToken } from "../../services/TokenServices";
import ResponseService from "../../services/ResponseService";

export const LoginController: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required." });
    return;
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      res.status(400).json({ message: "Such user does not exist." });
      return;
    }

    const isValidPassword = await comparePassword(password, user.password);

    if (!isValidPassword) {
      res.status(400).json({ message: "Invalid email or password." });
      return;
    }

    const token = generateToken({ id: user.id, email: user.email });

    ResponseService.success(res, { token });
  } catch {
    ResponseService.error(res, "Internal server error.", 500);
  }
};
