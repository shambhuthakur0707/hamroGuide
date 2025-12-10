import Tag from "../models/Tag.js";


export const createTag = async (req, res) => {
try {
const tag = await Tag.create(req.body);
res.json(tag);
} catch (error) {
res.status(400).json({ error: error.message });
}
};