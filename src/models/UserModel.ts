import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../lib/sequelize";

interface UserAttributes {
  id: number;
  surname: string;
  name: string;
  licenseNumber: string;
  avatarUrl: string;
  email: string;
  password: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

class UserModel
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public surname!: string;
  public name!: string;
  public licenseNumber!: string;
  public avatarUrl!: string;
  public id!: number;
  public email!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    surname: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    name: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    licenseNumber: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    avatarUrl: {
      type: DataTypes.STRING,
      defaultValue: "https://via.placeholder.com/150",
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

export default UserModel;
