import mongoose, { Schema } from "mongoose";

export interface IRepair {
  car: string;
  damages: string[];
  date: Date;
}

const RepairSchema = new Schema<IRepair>(
  {
    car: {
      type: String,
      required: true,
      ref: "Car",
    },
    damages: {
      type: [String],
      required: true,
      ref: "Damage",
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

const RepairModel = mongoose.model<IRepair>("Repair", RepairSchema);

export default RepairModel;
