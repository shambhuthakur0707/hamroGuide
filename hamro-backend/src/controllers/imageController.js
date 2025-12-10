import Image from "../models/Image.js";

// CREATE - Already exists
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

// READ ALL - NEW
export const getAllImages = async (req, res) => {
  try {
    const images = await Image.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// READ ONE - NEW
export const getImageById = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }
    res.json(image);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE - NEW
export const deleteImage = async (req, res) => {
  try {
    const image = await Image.findByIdAndDelete(req.params.id);
    
    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    res.json({ message: "Image deleted successfully", image });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};