import Redis from "ioredis";
import CONFIG from "../constants/config";

const redis = new Redis(CONFIG.REDIS_URL);

export default redis;
