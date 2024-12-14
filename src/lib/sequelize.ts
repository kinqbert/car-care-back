import { Sequelize } from "sequelize";
import CONFIG from "../constants/config";

const sequelize = new Sequelize(CONFIG.POSTGRES_URL, {
  dialect: "postgres",
  logging: false,
});

export async function connectPostgres() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
  } catch (error) {
    console.error("Unable to connect to PostgreSQL:", error);
  }
}

export default sequelize;
