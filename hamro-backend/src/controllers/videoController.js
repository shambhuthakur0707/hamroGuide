import Video from "../models/Video.js";

// CREATE - Already exists
export const createVideo = async (req, res) => {
  try {
    const video = await Video.create(req.body);
    res.json(video);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ ALL - NEW
export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ONE - NEW
export const getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ error: "Video not found" });
    }
    res.json(video);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE - NEW
export const updateVideo = async (req, res) => {
  try {
    const video = await Video.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!video) {
      return res.status(404).json({ error: "Video not found" });
    }

    res.json(video);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE - NEW
export const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);
    
    if (!video) {
      return res.status(404).json({ error: "Video not found" });
    }

    res.json({ message: "Video deleted successfully", video });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};