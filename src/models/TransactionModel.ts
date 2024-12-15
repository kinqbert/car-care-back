import mongoose, { Schema } from "mongoose";

export interface ITransaction {
  car: string;
  seller: string;
  buyer: string;
  date: Date;
}

const TransactionSchema = new Schema<ITransaction>(
  {
    car: {
      type: String,
      required: true,
      ref: "Car",
    },
    seller: {
      type: String,
      required: true,
    },
    buyer: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

const TransactionModel = mongoose.model<ITransaction>(
  "Transaction",
  TransactionSchema
);

export default TransactionModel;
