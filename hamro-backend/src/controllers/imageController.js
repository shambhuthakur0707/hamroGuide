import Image from "../models/Image.js";
import path from "path";
import fs from "fs";

// UPLOAD IMAGE
export const uploadImage = async (req, res) => {
  try {
    const { tag_id, program_id, order, customFilename } = req.body;

    let hero_link = null;
    let thumbnail_link = null;
    let filename = null;

    // Handle hero file
    if (req.files.hero && req.files.hero[0]) {
      const file = req.files.hero[0];
      const ext = path.extname(file.originalname);
      const finalName = customFilename ? `${customFilename}${ext}` : file.filename;
      const newPath = path.join(file.destination, finalName);

      if (customFilename) {
        fs.renameSync(file.path, newPath);
      }

      hero_link = `uploads/${finalName}`;
      filename = finalName;
    }

    // Handle thumbnail file
    if (req.files.thumbnail && req.files.thumbnail[0]) {
      const file = req.files.thumbnail[0];
      const ext = path.extname(file.originalname);
      const finalName = customFilename ? `${customFilename}-thumb${ext}` : file.filename;
      const newPath = path.join(file.destination, finalName);

      if (customFilename) {
        fs.renameSync(file.path, newPath);
      }

      thumbnail_link = `uploads/${finalName}`;
    }

    const img = await Image.create({
      tag_id,
      program_id: program_id || null,
      hero_link,
      thumbnail_link,
      filename,
      order: order || 0
    });

    res.json({
      _id: img._id,
      filename: img.filename,
      tag_id: img.tag_id,
      program_id: img.program_id,
      thumbnail_link: img.thumbnail_link,
      hero_link: img.hero_link,
      order: img.order
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET ALL IMAGES (Gallery page)
export const getAllImages = async (req, res) => {
  try {
    const images = await Image.find({}, "_id filename tag_id program_id thumbnail_link hero_link order")
      .populate("tag_id", "name")
      .populate("program_id", "title_en title_sl")
      .sort({ createdAt: -1 });

    res.json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET IMAGES BY PROGRAM (Program detail page)
export const getImagesByProgram = async (req, res) => {
  try {
    const { program_id } = req.params;

    const images = await Image.find({ program_id }, "_id filename tag_id program_id thumbnail_link hero_link order")
      .populate("tag_id", "name")
      .sort({ order: 1, createdAt: -1 });

    res.json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET IMAGES BY TAG (Filter by category)
export const getImagesByTag = async (req, res) => {
  try {
    const { tag_id } = req.params.tag_id.trim();

    const images = await Image.find({ tag_id }, "_id filename tag_id program_id thumbnail_link hero_link order")
      .populate("program_id", "title_en title_sl")
      .sort({ createdAt: -1 });

    res.json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET SINGLE IMAGE
export const getImageById = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id, "_id filename tag_id program_id thumbnail_link hero_link order")
      .populate("tag_id", "name")
      .populate("program_id", "title_en title_sl");

    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    res.json(image);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE IMAGE
export const updateImage = async (req, res) => {
  try {
    const { tag_id, program_id, order, customFilename } = req.body;
    const updateData = { tag_id, program_id, order };

    if (req.files) {
      if (req.files.hero && req.files.hero[0]) {
        const file = req.files.hero[0];
        const ext = path.extname(file.originalname);
        const finalName = customFilename ? `${customFilename}${ext}` : file.filename;
        const newPath = path.join(file.destination, finalName);

        if (customFilename) {
          fs.renameSync(file.path, newPath);
        }

        updateData.hero_link = `uploads/${finalName}`;
        updateData.filename = finalName;
      }
      if (req.files.thumbnail && req.files.thumbnail[0]) {
        const file = req.files.thumbnail[0];
        const ext = path.extname(file.originalname);
        const finalName = customFilename ? `${customFilename}-thumb${ext}` : file.filename;
        const newPath = path.join(file.destination, finalName);

        if (customFilename) {
          fs.renameSync(file.path, newPath);
        }

        updateData.thumbnail_link = `uploads/${finalName}`;
      }
    }

    const image = await Image.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true, select: "_id filename tag_id program_id thumbnail_link hero_link order" }
    );

    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    res.json(image);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE IMAGE
export const deleteImage = async (req, res) => {
  try {
    const image = await Image.findByIdAndDelete(req.params.id);

    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    // Optional: remove files from uploads folder
    try {
      if (image.hero_link) fs.unlinkSync(image.hero_link);
      if (image.thumbnail_link) fs.unlinkSync(image.thumbnail_link);
    } catch (err) {
      console.warn("File cleanup failed:", err.message);
    }

    res.json({ message: "Image deleted successfully", image_id: image._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
