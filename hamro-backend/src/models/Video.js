import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
  embedUrl: { type: String, required: true },
  
  title_en: String,
  title_sl: String,
  
  description_en: String,
  description_sl: String,
  
  // Optional: Link to specific program
  program_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Program"
  },
  
  // Display order
  order: {
    type: Number,
    default: 0
  }
  
}, { timestamps: true });

// Index for filtering
VideoSchema.index({ program_id: 1, order: 1 });

export default mongoose.model("Video", VideoSchema);