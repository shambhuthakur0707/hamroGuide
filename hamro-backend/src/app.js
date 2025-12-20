import express from "express";
import cors from "cors";
import connectDB from "../config/db.js";
import imageRoutes from "./routes/imageRoutes.js";
import programRoutes from "./routes/programRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import tagRoutes from "./routes/tagRoutes.js";
import heroSlideRoutes from "./routes/heroSlideRoutes.js"; 
import reviewRoutes from "./routes/reviewRoutes.js";

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// 🔧 Auto-trim middleware (applies to ALL endpoints)
app.use((req, res, next) => {
  // Trim query parameters
  for (const key in req.query) {
    if (typeof req.query[key] === "string") {
      req.query[key] = req.query[key].trim();
    }
  }

  // Trim route parameters
  for (const key in req.params) {
    if (typeof req.params[key] === "string") {
      req.params[key] = req.params[key].trim();
    }
  }

  // Trim body fields
  for (const key in req.body) {
    if (typeof req.body[key] === "string") {
      req.body[key] = req.body[key].trim();
    }
  }

  next();
});

connectDB();

app.use("/uploads", express.static("uploads"));
app.use("/api/images", imageRoutes);
app.use("/api/programs", programRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/tags", tagRoutes);
app.use("/api/hero-slides", heroSlideRoutes);
app.use("/api/reviews", reviewRoutes);

export default app;
