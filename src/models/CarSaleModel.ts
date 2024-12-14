import mongoose, { Schema } from "mongoose";

export interface ICarSale {
  carId: string;
  sellerId: string;
  buyerId: string;
}

const CarSaleSchema = new Schema<ICarSale>({
  carId: {
    type: String,
    required: true,
    ref: "Car",
  },
  sellerId: {
    type: String,
    required: true,
  },
  buyerId: {
    type: String,
    required: true,
  },
});

const CarSaleModel = mongoose.model<ICarSale>("CarSale", CarSaleSchema);

export default CarSaleModel;
