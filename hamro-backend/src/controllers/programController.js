import Program from "../models/Program.js";


export const createProgram = async (req, res) => {
try {
const { title_en, title_sl, description_en, description_sl } = req.body;


const banner_image = req.file ? req.file.path : null;


const prog = await Program.create({
title_en,
title_sl,
description_en,
description_sl,
banner_image
});


res.json(prog);
} catch (err) {
res.status(400).json({ error: err.message });
}
};