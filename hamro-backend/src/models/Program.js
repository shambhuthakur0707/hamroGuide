import mongoose from "mongoose";

const ProgramSchema = new mongoose.Schema({
  title_en: { type: String, required: true },
  title_sl: { type: String, required: true },

  description_en: { type: String, required: true },
  description_sl: { type: String, required: true },

  short_description_en: String,
  short_description_sl: String,

  banner_image: String,
  duration: String, // e.g., "7 Days"

  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],

  price: Number,
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

ProgramSchema.index({ isActive: 1, order: 1 });
ProgramSchema.index({ tags: 1 });

export default mongoose.model("Program", ProgramSchema);
