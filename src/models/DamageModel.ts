import mongoose, { Schema } from "mongoose";
import { DamageSeverity } from "../enums/DamageSeverity";

export interface IDamage {
  car: string;
  shortDescription: string;
  description: string;
  severity: DamageSeverity;
  isRepaired: boolean;
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
    isRepaired: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
  }
);

const DamageModel = mongoose.model<IDamage>("Damage", DamageSchema);

export default DamageModel;
