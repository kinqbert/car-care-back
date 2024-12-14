import express, { Express } from "express";
import routes from "./routes";
import CONFIG from "./constants/config";
import cors from "cors";
import morgan from "morgan";
import { initDatabases } from "./loaders/initDatabases";
import { authMiddleware } from "./middlewares/authMiddleware";
import "dotenv/config";

const app: Express = express();

const startServer = async () => {
  const port = CONFIG.PORT;

  app.use(cors());
  app.use(morgan("tiny"));
  app.use(express.json());
  app.use(authMiddleware);

  routes(app);

  await initDatabases();

  app.listen(port, () => {
    console.log(`[*] Server is running at http://localhost:${port}`);
  });
};

startServer();
