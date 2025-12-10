import mongoose from "mongoose";

const connectDB = async () => {
  const envUri = process.env.MONGO_URI;
  const localUri = "mongodb://127.0.0.1:27017/hamroGuide";

  // Choose which URI to try first: environment variable (if set and not a placeholder), otherwise local fallback
  const shouldUseEnv = envUri && !envUri.includes("...");
  const firstUri = shouldUseEnv ? envUri : localUri;

  console.log("DEBUG: attempting MongoDB connection. firstUri:", (firstUri || "(none)").slice(0, 200));

  try {
    await mongoose.connect(firstUri);
    console.log("MongoDB Connected ->", firstUri.startsWith("mongodb://127.0.0.1") ? "local (hamroGuide)" : firstUri);
    return;
  } catch (err) {
    console.error("MongoDB connection failed for:", firstUri, err.message);
    // If we tried env first, attempt local fallback before giving up
    if (shouldUseEnv) {
      console.log("DEBUG: attempting local fallback to", localUri);
      try {
        await mongoose.connect(localUri);
        console.log("MongoDB Connected to local fallback ->", localUri);
        return;
      } catch (err2) {
        console.error("Local fallback also failed:", err2.message);
      }
    }

    console.warn("Continuing without DB connection. Some features will not work until a valid MONGO_URI is provided or MongoDB is running locally.");
  }
};

export default connectDB;
