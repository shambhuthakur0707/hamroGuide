import Image from "../models/Image.js";

export const uploadImage = async (req, res) => {
try {
const { title_en, title_sl, description_en, description_sl, tag_id } = req.body;


const hero_link = req.files.hero[0].path;
const thumbnail_link = req.files.thumbnail[0].path;


const img = await Image.create({
title_en,
title_sl,
description_en,
description_sl,
tag_id,
hero_link,
thumbnail_link
});


res.json(img);
} catch (error) {
res.status(400).json({ error: error.message });
}
};