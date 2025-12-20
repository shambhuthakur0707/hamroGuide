import mongoose from "mongoose";

const TagSchema = new mongoose.Schema(
  {
    name_en: {
      type: String,
      required: true,
      trim: true
    },
    name_sl: {
      type: String,
      required: true,
      trim: true
    }
  },
  { 
    timestamps: true 
  }
);

// Transform output when converting to JSON
TagSchema.set("toJSON", {
  transform: (doc, ret) => {
    return {
      tag_id: ret._id.toString(),
      name_en: ret.name_en,
      name_sl: ret.name_sl
    };
  }
});

export default mongoose.model("Tag", TagSchema);