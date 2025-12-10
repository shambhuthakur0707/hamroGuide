import mongoose from "mongoose";


const VideoSchema = new mongoose.Schema({
embedUrl: String,
title_en: String,
title_sl: String,
description_en: String,
description_sl: String
});


export default mongoose.model("Video", VideoSchema);