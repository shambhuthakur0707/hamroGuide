import mongoose from "mongoose";

const ProgramSchema = new mongoose.Schema({
  title_en: String,
  title_sl: String,
  description_en: String,
  description_sl: String,
  banner_image: String
}, { timestamps: true });

export default mongoose.model("Program", ProgramSchema);