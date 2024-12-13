import express, { Express } from "express";
import routes from "./routes";
import CONFIG from "./constants/config";
import { initDatabases } from "./loaders/initDatabases";
import "dotenv/config";

const app: Express = express();

const startServer = async () => {
  const port = CONFIG.PORT;

  app.use(express.json());
  routes(app);

  await initDatabases();

  app.listen(port, () => {
    console.log(`[*] Server is running at http://localhost:${port}`);
  });
};

startServer();
