import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Save with original name first
  }
});

const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/jpg"];
  if (!allowed.includes(file.mimetype)) {
    cb(new Error("Only JPG/PNG allowed"), false);
  } else {
    cb(null, true);
  }
};

const upload = multer({ storage, fileFilter });

// Middleware to rename file after upload
export const renameUploadedFile = (req, res, next) => {
  if (req.body.customFilename && req.file) {
    const ext = path.extname(req.file.originalname);
    const newName = req.body.customFilename + ext;
    const oldPath = req.file.path;
    const newPath = path.join(req.file.destination, newName);

    fs.rename(oldPath, newPath, (err) => {
      if (err) return next(err);
      req.file.filename = newName;
      req.file.path = newPath;
      next();
    });
  } else {
    next();
  }
};

export default upload;
