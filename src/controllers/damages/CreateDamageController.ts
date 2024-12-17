import { RequestHandler } from "express";
import ResponseService from "../../services/ResponseService";
import DamageModel from "../../models/DamageModel";

export const CreateDamageController: RequestHandler = async (req, res) => {
  try {
    const damage = await DamageModel.create({
      ...req.body,
    });

    ResponseService.success(res, damage);
  } catch {
    ResponseService.error(res, "validation failed", 400);
  }
};
