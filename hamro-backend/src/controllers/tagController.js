import Tag from "../models/Tag.js";

// CREATE TAG
export const createTag = async (req, res) => {
  try {
    const { name_en, name_sl } = req.body;

    // Validate input
    if (!name_en || !name_sl) {
      return res.status(400).json({ 
        error: "Both name_en and name_sl are required" 
      });
    }

    const tag = await Tag.create({ name_en, name_sl });
    res.status(201).json(tag);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET ALL TAGS
export const getAllTags = async (req, res) => {
  try {
    const tags = await Tag.find().sort({ name_en: 1 });
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET SINGLE TAG BY ID
export const getTagById = async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);
    
    if (!tag) {
      return res.status(404).json({ error: "Tag not found" });
    }
    
    res.status(200).json(tag);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE TAG
export const updateTag = async (req, res) => {
  try {
    const { name_en, name_sl } = req.body;

    const tag = await Tag.findByIdAndUpdate(
      req.params.id,
      { name_en, name_sl },
      { new: true, runValidators: true }
    );

    if (!tag) {
      return res.status(404).json({ error: "Tag not found" });
    }

    res.status(200).json(tag);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE TAG
export const deleteTag = async (req, res) => {
  try {
    const tag = await Tag.findByIdAndDelete(req.params.id);
    
    if (!tag) {
      return res.status(404).json({ error: "Tag not found" });
    }

    res.status(200).json({ 
      message: "Tag deleted successfully", 
      tag 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};