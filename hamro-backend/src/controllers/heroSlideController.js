import HeroSlide from "../models/HeroSlide.js";

// CREATE
export const createHeroSlide = async (req, res) => {
  try {
    const { title_en, title_sl, description_en, description_sl, order, isActive } = req.body;
    const image = req.file ? req.file.path : null;

    if (!image) {
      return res.status(400).json({ error: "Image is required" });
    }

    const slide = await HeroSlide.create({
      title_en,
      title_sl,
      description_en,
      description_sl,
      image,
      order: order || 0,
      isActive: isActive !== undefined ? isActive : true
    });

    res.json(slide);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ ALL (sorted by order)
export const getAllHeroSlides = async (req, res) => {
  try {
    const slides = await HeroSlide.find().sort({ order: 1 });
    res.json(slides);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ACTIVE ONLY (for frontend display)
export const getActiveHeroSlides = async (req, res) => {
  try {
    const slides = await HeroSlide.find({ isActive: true }).sort({ order: 1 });
    res.json(slides);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ONE
export const getHeroSlideById = async (req, res) => {
  try {
    const slide = await HeroSlide.findById(req.params.id);
    if (!slide) {
      return res.status(404).json({ error: "Hero slide not found" });
    }
    res.json(slide);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
export const updateHeroSlide = async (req, res) => {
  try {
    const { title_en, title_sl, description_en, description_sl, order, isActive } = req.body;
    
    const updateData = {
      title_en,
      title_sl,
      description_en,
      description_sl,
      order,
      isActive
    };

    // If new image uploaded, update it
    if (req.file) {
      updateData.image = req.file.path;
    }

    const slide = await HeroSlide.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!slide) {
      return res.status(404).json({ error: "Hero slide not found" });
    }

    res.json(slide);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE
export const deleteHeroSlide = async (req, res) => {
  try {
    const slide = await HeroSlide.findByIdAndDelete(req.params.id);
    
    if (!slide) {
      return res.status(404).json({ error: "Hero slide not found" });
    }

    res.json({ message: "Hero slide deleted successfully", slide });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};