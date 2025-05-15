import mongoose from "mongoose";
// import dotenv from "dotenv"
const DB_NAME = "ACMETRACK";

const connectDb = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}?retryWrites=true&w=majority`
    );
    console.log(
      `MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    process.exit(1);
  }
};

export default connectDb;
