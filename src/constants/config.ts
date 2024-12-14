import "dotenv/config";
import Joi from "joi";

interface Config {
  PORT: number;
  REFRESH_TOKEN_SECRET: string;
  ACCESS_TOKEN_SECRET: string;
  REFRESH_TOKEN_LIFESPAN_SECONDS: number;
  ACCESS_TOKEN_LIFESPAN: string;
  REDIS_URL: string;
  POSTGRES_URL: string;
  MONGO_DB_URI: string;
}

const configSchema = Joi.object<Config>({
  PORT: Joi.number().default(5050),
  REFRESH_TOKEN_SECRET: Joi.string().required(),
  ACCESS_TOKEN_SECRET: Joi.string().required(),
  REFRESH_TOKEN_LIFESPAN_SECONDS: Joi.number().required(),
  ACCESS_TOKEN_LIFESPAN: Joi.string().required(),
  REDIS_URL: Joi.string().required(),
  POSTGRES_URL: Joi.string().required(),
  MONGO_DB_URI: Joi.string().required(),
}).unknown();

const { error, value: CONFIG } = configSchema.validate(process.env);

if (error) {
  throw new Error(`Error validating environment variables: ${error.message}`);
}

export default CONFIG;
