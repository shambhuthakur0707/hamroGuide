import mongoose from "mongoose";

const HeroSlideSchema = new mongoose.Schema({
  title_en: { type: String, required: true },
  title_sl: { type: String, required: true },
  description_en: { type: String, required: true },
  description_sl: { type: String, required: true },
  image: { type: String, required: true },  // Image path
  order: { type: Number, default: 0 },  // Display order (0 = first)
  isActive: { type: Boolean, default: true }  // Show/hide slide
}, { timestamps: true });

export default mongoose.model("HeroSlide", HeroSlideSchema);