import Tag from "../models/Tag.js";

// CREATE - Already exists
export const createTag = async (req, res) => {
  try {
    const tag = await Tag.create(req.body);
    res.json(tag);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// READ ALL - NEW
export const getAllTags = async (req, res) => {
  try {
    const tags = await Tag.find().sort({ name: 1 });
    res.json(tags);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// READ ONE - NEW
export const getTagById = async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);
    if (!tag) {
      return res.status(404).json({ error: "Tag not found" });
    }
    res.json(tag);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE - NEW
export const updateTag = async (req, res) => {
  try {
    const tag = await Tag.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!tag) {
      return res.status(404).json({ error: "Tag not found" });
    }

    res.json(tag);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE - NEW
export const deleteTag = async (req, res) => {
  try {
    const tag = await Tag.findByIdAndDelete(req.params.id);
    
    if (!tag) {
      return res.status(404).json({ error: "Tag not found" });
    }

    res.json({ message: "Tag deleted successfully", tag });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
