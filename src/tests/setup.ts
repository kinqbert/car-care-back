import mongoose from "mongoose";
import { startServer } from "../app";
import redis from "../lib/redis";
import sequelize from "../lib/sequelize";

let server: any;

beforeAll(async () => {
  await sequelize.sync({ force: true });
  server = await startServer(8080, false); // Ensure the server starts before running tests
});

afterAll(async () => {
  await server.close(); // Close the server
  await mongoose.connection.close(); // Close MongoDB connection
  await redis.quit(); // Disconnect Redis
});
