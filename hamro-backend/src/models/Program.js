import mongoose from "mongoose";


const ProgramSchema = new mongoose.Schema({
title_en: String,
title_sl: String,
description_en: String, // Tiptap content
description_sl: String,
banner_image: String
});


export default mongoose.model("Program", ProgramSchema);