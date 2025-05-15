import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config({
  path: "./.env",
});
const app = express();
console.log("Environment Variables Loaded", process.env.CORS_ORIGIN),
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN, // your frontend URL
      credentials: true, // allow cookies to be sent
    })
  );

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
import userRouter from "./routes/user.routes.js";
import healthRouter from "./routes/health.route.js";
import shipmentRouter from "./routes/shipment.route.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/health", healthRouter);
app.use("/api/v1/shipments", shipmentRouter);

export { app };
