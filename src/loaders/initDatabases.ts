import connectMongo from "../lib/mongodb";
import redis from "../lib/redis";
import { connectPostgres } from "../lib/sequelize";

export async function initDatabases() {
  await connectPostgres();
  await connectMongo();
  // await redis.connect();
  console.log("All databases initialized");
}
