import mongoose from "mongoose";


const ImageSchema = new mongoose.Schema({
title_en: { type: String, maxLength: 250 },
title_sl: { type: String, maxLength: 250 },
description_en: { type: String, maxLength: 250 },
description_sl: { type: String, maxLength: 250 },
thumbnail_link: String,
hero_link: String,
tag_id: { type: mongoose.Schema.Types.ObjectId, ref: "Tag" }
});


export default mongoose.model("Image", ImageSchema);