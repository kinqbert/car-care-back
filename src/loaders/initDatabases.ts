import connectMongo from "../lib/mongodb";
import { connectPostgres } from "../lib/sequelize";

export async function initDatabases() {
  await connectPostgres();
  await connectMongo();
}
