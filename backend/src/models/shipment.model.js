import mongoose from "mongoose";

const shipmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    medication: { type: String, required: true },
    quantity: { type: String, required: true },
    dosage: { type: String, required: true },
    expectedDeliveryDate: { type: Date, required: true },
    status: { type: String, required: true },
    progress: { type: Number, required: true },
    carrier: { type: String, required: true },
    trackingNumber: { type: String, required: true },
    refillNumber: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Shipment = mongoose.model("Shipment", shipmentSchema);
