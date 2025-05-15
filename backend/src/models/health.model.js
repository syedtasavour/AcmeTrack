import mongoose from "mongoose";

const healthSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dailyWeight: { type: Number, required: true }, // in lbs
    heartRate: { type: Number, required: true }, // in bpm
    bloodPressure: { type: String, required: true }, // e.g., "120/80"
    height: { type: Number, required: true }, // in inches
    medications: [
      {
        type: { type: String, required: true }, // e.g., "Aspirin"
        dosage: { type: String, required: true },
        time: { type: String }, // e.g., "8:00 AM"
      },
    ], // array of medications
    symptomsMood: { type: String }, // optional field for symptoms/mood
  },
  { timestamps: true }
);

export const HealthLog = mongoose.model("HealthLog", healthSchema);
