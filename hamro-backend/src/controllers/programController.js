import Program from "../models/Program.js";
import Image from "../models/Image.js";
import Video from "../models/Video.js";
import Review from "../models/Review.js";

// CREATE PROGRAM
export const createProgram = async (req, res) => {
  try {
    const {
      title_en, title_sl,
      description_en, description_sl,
      short_description_en, short_description_sl,
      duration, tags, price, order, isActive
    } = req.body;

    const banner_image = req.file ? req.file.path : null;
    const parsedTags = typeof tags === "string" ? JSON.parse(tags) : tags;

    const prog = await Program.create({
      title_en, title_sl,
      description_en, description_sl,
      short_description_en, short_description_sl,
      banner_image, duration,
      tags: parsedTags || [],
      price,
      order: order || 0,
      isActive: isActive !== undefined ? isActive : true
    });

    const populated = await Program.findById(prog._id).populate("tags", "name");
    res.json(populated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET ALL PROGRAMS (lightweight)
export const getAllPrograms = async (req, res) => {
  try {
    const programs = await Program.find({}, "_id title_en title_sl").sort({ order: 1 });
    res.json(programs.map(p => ({
      program_id: p._id.toString(),
      title_en: p.title_en,
      title_sl: p.title_sl
    })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET SINGLE PROGRAM (basic info)
export const getProgramById = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id).populate("tags", "name");
    if (!program) return res.status(404).json({ error: "Program not found" });
    res.json(program);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET PROGRAM DETAILS (full info)
export const getProgramDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const program = await Program.findById(id).populate("tags", "name");
    if (!program) return res.status(404).json({ error: "Program not found" });

    const images = await Image.find({ program_id: id }, "_id filename");
    const videos = await Video.find({ program_id: id }, "_id embedUrl");
    const reviews = await Review.find({ programId: id })
      .sort({ createdAt: -1 })
      .limit(10)
      .select("userName rating comment");

    const totalReviews = reviews.length;
    const averageRating =
      totalReviews === 0
        ? 0
        : (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1);

    const ratingSummary = {
      5: reviews.filter(r => r.rating === 5).length,
      4: reviews.filter(r => r.rating === 4).length,
      3: reviews.filter(r => r.rating === 3).length,
      2: reviews.filter(r => r.rating === 2).length,
      1: reviews.filter(r => r.rating === 1).length,
    };

    res.json({
      program_id: program._id.toString(),
      title_en: program.title_en,
      title_sl: program.title_sl,
      description_en: program.description_en,
      description_sl: program.description_sl,
      short_description_en: program.short_description_en,
      short_description_sl: program.short_description_sl,
      duration: program.duration,
      price: program.price,
      order: program.order,
      isActive: program.isActive,
      tags: program.tags.map(t => ({ tag_id: t._id.toString(), name: t.name })),
      images: images.map(i => ({ image_id: i._id.toString(), filename: i.filename })),
      videos: videos.map(v => ({ video_id: v._id.toString(), embedUrl: v.embedUrl })),
      reviews: {
        totalReviews,
        averageRating,
        ratingSummary,
        list: reviews.map(r => ({
          review_id: r._id.toString(),
          userName: r.userName,
          rating: r.rating,
          comment: r.comment
        }))
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE PROGRAM
export const updateProgram = async (req, res) => {
  try {
    const {
      title_en, title_sl,
      description_en, description_sl,
      short_description_en, short_description_sl,
      duration, tags, price, order, isActive
    } = req.body;

    const updateData = {
      title_en, title_sl,
      description_en, description_sl,
      short_description_en, short_description_sl,
      duration, price, order, isActive
    };

    if (tags) updateData.tags = typeof tags === "string" ? JSON.parse(tags) : tags;
    if (req.file) updateData.banner_image = req.file.path;

    const program = await Program.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate("tags", "name");

    if (!program) return res.status(404).json({ error: "Program not found" });
    res.json(program);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE PROGRAM
export const deleteProgram = async (req, res) => {
  try {
    const program = await Program.findByIdAndDelete(req.params.id);
    if (!program) return res.status(404).json({ error: "Program not found" });
    res.json({ message: "Program deleted successfully", program });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
