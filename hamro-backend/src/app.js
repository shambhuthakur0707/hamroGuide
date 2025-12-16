import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import imageRoutes from "./routes/imageRoutes.js";
import programRoutes from "./routes/programRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import tagRoutes from "./routes/tagRoutes.js";
import heroSlideRoutes from "./routes/heroSlideRoutes.js"; 
import reviewRoutes from "./routes/reviewRoutes.js";


const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));


connectDB();


app.use("/uploads", express.static("uploads"));
app.use("/api/images", imageRoutes);
app.use("/api/programs", programRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/tags", tagRoutes);
app.use("/api/hero-slides", heroSlideRoutes);
app.use("/api/reviews", reviewRoutes);


export default app;