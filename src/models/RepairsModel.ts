import mongoose, { Schema } from "mongoose";
import { RepairSeverity } from "../enums/RepairSeverity";

export interface IRepair {
  car: string;
  shortDescription: string;
  description: string;
  severity: RepairSeverity;
}

const RepairSchema = new Schema<IRepair>({
  car: {
    type: String,
    required: true,
    ref: "Car",
  },
  shortDescription: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  severity: {
    type: String,
    required: true,
    enum: Object.values(RepairSeverity),
  },
});

const RepairModel = mongoose.model<IRepair>("Repair", RepairSchema);

export default RepairModel;
