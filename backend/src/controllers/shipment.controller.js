import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Shipment } from "../models/shipment.model.js";

// Get all shipments
const getShipments = asyncHandler(async (req, res) => {
  const shipments = await Shipment.find();

  res
    .status(200)
    .json(new ApiResponse(200, "Shipments retrieved successfully", shipments));
});

// Create a shipment
