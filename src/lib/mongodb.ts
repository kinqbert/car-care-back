import mongoose from "mongoose";
import CONFIG from "../constants/config";

const connectMongo = async () => {
  await mongoose.connect(CONFIG.MONGO_DB_URI);
};

export default connectMongo;
