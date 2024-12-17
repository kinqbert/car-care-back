import mongoose, { Schema } from "mongoose";
import { DamageSeverity } from "../enums/DamageSeverity";

export interface IDamage {
  car: string;
  shortDescription: string;
  description: string;
  severity: DamageSeverity;
}

const DamageSchema = new Schema<IDamage>(
  {
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
      enum: Object.values(DamageSeverity),
    },
  },
  {
    versionKey: false,
  }
);

const DamageModel = mongoose.model<IDamage>("Damage", DamageSchema);

export default DamageModel;
