import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  // Image files
  thumbnail_link: String,
  hero_link: String,

  // Organization fields
  tag_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Tag",
    index: true
  },

  // Link to program
  program_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Program",
    index: true
  },

  // Original filename for reference
  filename: String,

  // Display order within program
  order: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

// Compound indexes for efficient queries
ImageSchema.index({ program_id: 1, order: 1 });
ImageSchema.index({ tag_id: 1, createdAt: -1 });

export default mongoose.model("Image", ImageSchema);
