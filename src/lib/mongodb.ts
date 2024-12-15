import mongoose from "mongoose";
import CONFIG from "../constants/config";
import CarModel, { ICar } from "../models/CarModel";
import RepairModel, { IRepair } from "../models/RepairsModel";
import { RepairSeverity } from "../enums/RepairSeverity";

const initialCarData: ICar[] = [
  {
    make: "Porche",
    model: "911 GT2 RS",
    year: 2020,
    ownerId: 1,
    logoImageUrl: "https://i.postimg.cc/9QNgTf4Q/pngwing-com-3.png",
    sideImageUrl:
      "https://i.postimg.cc/wMV0Bx8H/porsche-911-gt2-rs-sidepng.png",
    color: "Silver",
    weight: 1470,
    fuelType: "Petrol",
    maxSpeed: 340,
    price: 293200,
    horsePower: 700,
    isPurchaseAvailable: false,
  },
  {
    make: "Lamborghini",
    model: "Aventador SVJ",
    year: 2020,
    ownerId: 1,
    logoImageUrl: "https://i.postimg.cc/qM11V7xx/lamborghini-logo.png",
    sideImageUrl:
      "https://i.postimg.cc/bwMLrFMG/blue-lamborghini-side-view-dupea61hcfog5vd8.png",
    color: "Blue",
    weight: 1525,
    fuelType: "Petrol",
    maxSpeed: 350,
    price: 517770,
    horsePower: 770,
    isPurchaseAvailable: false,
  },
  {
    make: "Ferrari",
    model: "F8 Tributo",
    year: 2020,
    ownerId: 1,
    logoImageUrl: "https://i.postimg.cc/br39h6kw/ferrarri-logo.png",
    sideImageUrl:
      "https://i.postimg.cc/qMDxD5pm/red-ferrari-side-profile-t0lvgph9x1j99qk7-1.png",
    color: "Red",
    weight: 1435,
    fuelType: "Petrol",
    maxSpeed: 340,
    price: 276550,
    horsePower: 720,
    isPurchaseAvailable: false,
  },
];

const initialRepairData: IRepair[] = [
  {
    car: "1",
    shortDescription: "Engine repair",
    description: "Engine repair due to overheating.",
    severity: RepairSeverity.HIGH,
  },
  {
    car: "2",
    shortDescription: "Brake repair",
    description: "Brake repair due to wear and tear.",
    severity: RepairSeverity.HIGH,
  },
  {
    car: "3",
    shortDescription: "Oil change",
    description: "Oil change due to oil leakage.",
    severity: RepairSeverity.MEDIUM,
  },
];

const connectMongo = async () => {
  await mongoose.connect(CONFIG.MONGO_DB_URI);

  await uploadInitialCarData();
};

const uploadInitialCarData = async () => {
  await Promise.allSettled(
    initialCarData.map(async (car) => {
      const existingCar = await CarModel.findOne({
        make: car.make,
        model: car.model,
      });

      if (existingCar) {
        return;
      }

      const newCar = await CarModel.create(car);

      await Promise.allSettled(
        initialRepairData.map(async (repair) => {
          if (repair.car !== newCar._id.toString()) {
            return;
          }
        })
      );
    })
  );
};

export default connectMongo;
