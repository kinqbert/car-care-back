import express, { Express } from "express";
import routes from "./routes";
import CONFIG from "./constants/config";
import cors from "cors";
import morgan from "morgan";
import { initDatabases } from "./loaders/initDatabases";
import { authMiddleware } from "./middlewares/authMiddleware";
import "dotenv/config";

export const app: Express = express();

const initializeApp = async (isLoggerActive = true) => {
  app.use(cors());

  if (isLoggerActive) {
    app.use(morgan("tiny"));
  }

  app.use(express.json());
  app.use(authMiddleware);

  routes(app);

  await initDatabases();
};

export const startServer = async (
  port = CONFIG.PORT,
  isLoggerActive = true
) => {
  await initializeApp(isLoggerActive);
  return app.listen(port, () => {
    console.log(`[*] Server is running at http://localhost:${port}`);
  });
};

if (require.main === module) {
  startServer();
}
