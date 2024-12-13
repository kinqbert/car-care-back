import "dotenv/config";
import Joi from "joi";

interface Config {
  PORT: number;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  REDIS_URL: string;
  POSTGRES_URL: string;
  MONGO_DB_URI: string;
}

const configSchema = Joi.object<Config>({
  PORT: Joi.number().default(5050),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().required(),
  REDIS_URL: Joi.string().required(),
  POSTGRES_URL: Joi.string().required(),
  MONGO_DB_URI: Joi.string().required(),
}).unknown();

const { error, value: CONFIG } = configSchema.validate(process.env);

if (error) {
  throw new Error(`Error validating environment variables: ${error.message}`);
}

export default CONFIG;
