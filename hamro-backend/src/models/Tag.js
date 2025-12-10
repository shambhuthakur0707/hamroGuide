import mongoose from "mongoose";


const TagSchema = new mongoose.Schema({
name_en: String,
name_sl: String
});


export default mongoose.model("Tag", TagSchema);