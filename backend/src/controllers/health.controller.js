import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { HealthLog } from "../models/health.model.js";

const addHealthLog = asyncHandler(async (req, res) => {
  const {
    dailyWeight,
    height,
    heartRate,
    bloodPressure,
    medications,
    symptomsMood,
  } = req.body;

  // Validate required fields
  if (
    !dailyWeight ||
    !height ||
    !heartRate ||
    !bloodPressure ||
    !medications ||
    !Array.isArray(medications)
  ) {
    throw new ApiError(
      400,
      null,
      "All required fields must be provided and medications must be an array"
    );
  }

  // Validate each medication entry
  for (const medication of medications) {
    if (!medication.type || !medication.dosage) {
      // Increment user strike count for invalid input
      req.user.strikes = (req.user.strikes || 0) + 1;
      await req.user.save();

      throw new ApiError(
        400,
        null,
        "Each medication must have a type and dosage"
      );
    }
  }

  // Check the date of the last health log
  const lastHealthLog = await HealthLog.findOne({ userId: req.user._id }).sort({
    createdAt: -1,
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (lastHealthLog) {
    const lastLogDate = new Date(lastHealthLog.createdAt);
    lastLogDate.setHours(0, 0, 0, 0);

    // Increment strikes if the last log was not from today
    if (lastLogDate.getTime() !== today.getTime()) {
      req.user.strikes = (req.user.strikes || 0) + 1;
    } else {
      // Reset strikes if the last log was from today
      req.user.strikes = 0;
    }
  } else {
    // Increment strikes if no previous logs exist
    req.user.strikes = (req.user.strikes || 0) + 1;
  }

  await req.user.save();

  // Create a new health log entry
  const healthLog = await HealthLog.create({
    userId: req.user._id,
    dailyWeight,
    height,
    heartRate,
    bloodPressure,
    medications,
    symptomsMood,
  });

  res
    .status(201)
    .json(new ApiResponse(201, healthLog, "Health log added successfully"));
});

const getRecentHealthLogs = asyncHandler(async (req, res) => {
  const { limit = 2 } = req.query;

  // Fetch recent health log entries, sorted by creation date
  const healthLogs = await HealthLog.find({ userId: req.user._id })
    .sort({ createdAt: -1 })
    .limit(parseInt(limit));

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        healthLogs,
        "Recent health logs fetched successfully"
      )
    );
});

const getTodaysSummary = asyncHandler(async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Fetch today's health log entries
  const todaysLogs = await HealthLog.find({
    userId: req.user._id,
    createdAt: { $gte: today },
  });

  if (!todaysLogs.length) {
    throw new ApiError(404, null, "No health logs found for today");
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        todaysLogs,
        "Today's health logs fetched successfully"
      )
    );
});

const getHealthStatus = asyncHandler(async (req, res) => {
  // Fetch all health logs for the user
  const healthLogs = await HealthLog.find({ userId: req.user._id });

  if (!healthLogs.length) {
    throw new ApiError(404, null, "No health logs found for the user");
  }

  // Calculate averages for health metrics
  const totalLogs = healthLogs.length;
  const avgHeartRate =
    healthLogs.reduce((sum, log) => sum + log.heartRate, 0) / totalLogs;
  const avgWeight =
    healthLogs.reduce((sum, log) => sum + log.dailyWeight, 0) / totalLogs;

  // Example thresholds for health status percentages
  const heartRateStatus = Math.min((avgHeartRate / 100) * 100, 100).toFixed(2);
  const weightStatus = Math.min((avgWeight / 100) * 100, 100).toFixed(2);
  const bmiStatus = Math.min((avgWeight / 120) * 100, 100).toFixed(2); // Example BMI calculation

  const healthStatus = {
    heartRate: `${heartRateStatus}%`,
    weight: `${weightStatus}%`,
    bmi: `${bmiStatus}%`,
  };

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        healthStatus,
        "Health status calculated successfully"
      )
    );
});

const getTotalWeightLoss = asyncHandler(async (req, res) => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  // Fetch health logs from the last 30 days or as many as possible
  const healthLogs = await HealthLog.find({
    userId: req.user._id,
    createdAt: { $gte: thirtyDaysAgo },
  }).sort({ createdAt: 1 }); // Sort by date in ascending order

  if (healthLogs.length < 2) {
    throw new ApiError(404, null, "Not enough data to calculate weight loss");
  }

  // Calculate weight loss
  const initialWeight = healthLogs[0].dailyWeight;
  const latestWeight = healthLogs[healthLogs.length - 1].dailyWeight;
  const weightLoss = initialWeight - latestWeight;

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { weightLoss },
        "Total weight loss over the last 30 days or as many days as possible calculated successfully"
      )
    );
});
const calculateBMI = asyncHandler(async (req, res) => {
  // Fetch the most recent health log for the user
  const recentHealthLog = await HealthLog.findOne({
    userId: req.user._id,
  }).sort({
    createdAt: -1,
  });

  if (!recentHealthLog) {
    throw new ApiError(404, null, "No health logs found to calculate BMI");
  }

  const { dailyWeight: weight, height } = recentHealthLog;

  if (!weight || !height) {
    throw new ApiError(
      400,
      null,
      "Weight and height are required to calculate BMI"
    );
  }

  // Calculate BMI
  const heightInMeters = height / 100; // Convert height to meters
  const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);

  res
    .status(200)
    .json(
      new ApiResponse(200, { bmi }, "Body Mass Index calculated successfully")
    );
});
const getWeeklyWeightChange = asyncHandler(async (req, res) => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  // Fetch health logs from the last 7 days
  const healthLogs = await HealthLog.find({
    userId: req.user._id,
    createdAt: { $gte: sevenDaysAgo },
  }).sort({ createdAt: 1 }); // Sort by date in ascending order

  if (healthLogs.length < 2) {
    throw new ApiError(
      404,
      null,
      "Not enough data to calculate weekly weight change"
    );
  }

  // Calculate weight change
  const initialWeight = healthLogs[0].dailyWeight;
  const latestWeight = healthLogs[healthLogs.length - 1].dailyWeight;
  const weightChange = latestWeight - initialWeight;

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { weightChange },
        "Weight change over the last 7 days calculated successfully"
      )
    );
});

const getBloodPressureRecords = asyncHandler(async (req, res) => {
  // Fetch all health logs for the user

  const healthLogs = await HealthLog.find({ userId: req.user._id }).select(
    "bloodPressure createdAt"
  );

  if (!healthLogs.length) {
    throw new ApiError(
      404,
      null,
      "No blood pressure records found for the user"
    );
  }

  // Map records to include only date, month, and blood pressure
  const bloodPressureRecords = healthLogs.map((log) => {
    const date = log.createdAt.toISOString().split("T")[0]; // Extract date in YYYY-MM-DD format
    return {
      date,
      bloodPressure: log.bloodPressure,
    };
  });

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        bloodPressureRecords,
        "Blood pressure records fetched successfully"
      )
    );
});

export {
  addHealthLog,
  getRecentHealthLogs,
  getTodaysSummary,
  getHealthStatus,
  getTotalWeightLoss,
  calculateBMI,
  getWeeklyWeightChange,
  getBloodPressureRecords,
};
