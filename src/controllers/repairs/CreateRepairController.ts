import { RequestHandler } from "express";
import ResponseService from "../../services/ResponseService";
import RepairModel from "../../models/RepairsModel";

export const CreateRepairController: RequestHandler = async (req, res) => {
  const repair = await RepairModel.create({
    ...req.body,
  });

  ResponseService.success(res, repair);
};
