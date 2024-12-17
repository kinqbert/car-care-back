import { RequestHandler } from "express";
import ResponseService from "../../services/ResponseService";
import UserModel from "../../models/UserModel";
import { hashPassword } from "../../services/UserServices";

export const RegisterController: RequestHandler = async (req, res) => {
  const { email, password, name, surname, licenseNumber, avatarUrl } = req.body;

  if (!email || !password) {
    ResponseService.error(res, "Email and password are required.", 400);
    return;
  }

  const userExists = !!(await UserModel.findOne({ where: { email } }));

  if (userExists) {
    ResponseService.error(res, "User with such email already exists.", 400);
    return;
  }

  const encryptedPassword = await hashPassword(password);

  const userAvatar =
    avatarUrl ||
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541";

  const user = await UserModel.create(
    {
      email,
      name,
      surname,
      licenseNumber,
      avatarUrl: userAvatar,
      password: encryptedPassword,
    },
    { raw: true }
  );

  const userResponse = {
    id: user.id,
    email: user.email,
    name: user.name,
    surname: user.surname,
    licenseNumber: user.licenseNumber,
    avatarUrl: user.avatarUrl,
  };

  ResponseService.success(res, userResponse, 200);
};
