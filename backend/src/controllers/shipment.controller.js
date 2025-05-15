import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Shipment } from "../models/shipment.model.js";

// Get last 4 shipments
const getShipments = asyncHandler(async (req, res) => {
  const shipments = await Shipment.find({ userId: req.user._id })
    .sort({ createdAt: -1 })
    .skip(1)
    .limit(4);

  res
    .status(200)
    .json(new ApiResponse(200, shipments, "Shipments retrieved successfully"));
});

const getRecentShipment = asyncHandler(async (req, res) => {
  const recentShipment = await Shipment.findOne({ userId: req.user._id }).sort({
    createdAt: -1,
  });

  if (!recentShipment) {
    throw new ApiError(404, "No shipments found");
  }

  const created = recentShipment.createdAt;
  const expected = recentShipment.expectedDeliveryDate;

  // Determine progress based on status
  let progress = 0;
  switch (recentShipment.status) {
    case "pending":
      progress = 25;
      break;
    case "in transit":
      progress = 50;
      break;
    case "out for delivery":
      progress = 75;
      break;
    case "delivered":
      progress = 100;
      break;
    default:
      progress = 0;
  }

  const formattedShipment = {
    ...recentShipment.toObject(),

    createdAt: created.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }),

    expectedDeliveryDate: expected.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }),

    expectedDeliveryComponents: {
      day: expected.getDate(),
      monthName: expected.toLocaleString("en-US", { month: "long" }),
      year: expected.getFullYear(),
    },

    progress, // Add progress field
  };

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        formattedShipment,
        "Recent shipment retrieved successfully"
      )
    );
});

export { getShipments, getRecentShipment };
