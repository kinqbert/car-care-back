import { RequestHandler } from "express";
import ResponseService from "../../services/ResponseService";
import RepairModel from "../../models/RepairsModel";

export const CreateRepairController: RequestHandler = async (req, res) => {
  try {
    const repair = await RepairModel.create({
      ...req.body,
    });

    ResponseService.success(res, repair);
  } catch {
    ResponseService.error(res, "validation failed", 400);
  }
};
