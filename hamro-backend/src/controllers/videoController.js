import Video from "../models/Video.js";


export const createVideo = async (req, res) => {
try {
const video = await Video.create(req.body);
res.json(video);
} catch (err) {
res.status(400).json({ error: err.message });
}
};