import Program from "../models/Program.js";

// CREATE - Already exists
export const createProgram = async (req, res) => {
  try {
    const { title_en, title_sl, description_en, description_sl } = req.body;
    const banner_image = req.file ? req.file.path : null;

    const prog = await Program.create({
      title_en,
      title_sl,
      description_en,
      description_sl,
      banner_image
    });

    res.json(prog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ ALL - NEW
export const getAllPrograms = async (req, res) => {
  try {
    const programs = await Program.find().sort({ createdAt: -1 });
    res.json(programs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ONE - NEW
export const getProgramById = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);
    if (!program) {
      return res.status(404).json({ error: "Program not found" });
    }
    res.json(program);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE - NEW
export const updateProgram = async (req, res) => {
  try {
    const { title_en, title_sl, description_en, description_sl } = req.body;
    
    const updateData = {
      title_en,
      title_sl,
      description_en,
      description_sl
    };

    // If new banner image uploaded, update it
    if (req.file) {
      updateData.banner_image = req.file.path;
    }

    const program = await Program.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!program) {
      return res.status(404).json({ error: "Program not found" });
    }

    res.json(program);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE - NEW
export const deleteProgram = async (req, res) => {
  try {
    const program = await Program.findByIdAndDelete(req.params.id);
    
    if (!program) {
      return res.status(404).json({ error: "Program not found" });
    }

    res.json({ message: "Program deleted successfully", program });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};