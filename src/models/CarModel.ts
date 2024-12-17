import mongoose, { Schema } from "mongoose";

export interface ICar {
  make: string;
  model: string;
  year: number;
  ownerId: number;
  logoImageUrl: string;
  sideImageUrl: string;
  color: string;
  weight: number;
  fuelType: string;
  maxSpeed: number;
  price: number;
  horsePower: number;
  isPurchaseAvailable: boolean;
  createdAt: Date;
}

const CarSchema = new Schema<ICar>(
  {
    make: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    ownerId: {
      type: Number,
      required: true,
    },
    logoImageUrl: {
      type: String,
      required: true,
    },
    sideImageUrl: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    fuelType: {
      type: String,
      required: true,
    },
    maxSpeed: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    horsePower: {
      type: Number,
      required: true,
    },
    isPurchaseAvailable: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const CarModel = mongoose.model<ICar>("Car", CarSchema);

export default CarModel;
