import { connect } from "mongoose";

export const connectDatabase = async () => {
  try {
    await connect(process.env.MONGO_URI || "mongodb://localhost:27017/main");

    console.log("[server]: MongoDB Connected");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
