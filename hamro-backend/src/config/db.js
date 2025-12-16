import mongoose from "mongoose";

const DEFAULT_LOCAL_URI = "mongodb://127.0.0.1:27017/hamroGuide";

const connectDB = async () => {
  const envUri = process.env.MONGO_URI;
  const uri = envUri && envUri.trim() !== "" ? envUri : DEFAULT_LOCAL_URI;

  console.log("[DB] Using MongoDB URI:", uri.startsWith("mongodb://") || uri.startsWith("mongodb+srv://") ? uri : "(masked)");

  try {
    // Use recommended options by mongoose 
    await mongoose.connect(uri, {
      // these are mongoose defaults in v6+, kept for explicitness
      autoIndex: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000
    });
    console.log("[DB] MongoDB connected");
    mongoose.connection.on("error", (err) => console.error("[DB] Connection error:", err));
    mongoose.connection.on("disconnected", () => console.warn("[DB] MongoDB disconnected"));
  } catch (err) {
    console.error("[DB] Failed to connect to MongoDB:", err.message || err);
    // Do not throw — allow server to continue running so non-DB routes can be tested.
  }
};

export default connectDB;
