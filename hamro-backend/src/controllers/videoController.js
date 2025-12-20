import Video from "../models/Video.js";

// CREATE VIDEO
export const createVideo = async (req, res) => {
  try {
    const video = await Video.create(req.body);
    res.json(video);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ ALL VIDEOS
export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// NEW: GET VIDEOS BY PROGRAM
export const getVideosByProgram = async (req, res) => {
  try {
    const { program_id } = req.params;
    
    const videos = await Video.find({ program_id })
      .sort({ order: 1, createdAt: -1 });
    
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// READ SINGLE VIDEO
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

// UPDATE VIDEO
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

// DELETE VIDEO
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