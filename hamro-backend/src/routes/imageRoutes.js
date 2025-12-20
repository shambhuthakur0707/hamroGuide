import express from "express";
import upload from "../middleware/upload.js";
import transformIds from "../middleware/transformIds.js";
import {
  uploadImage,
  getAllImages,
  getImagesByProgram,
  getImagesByTag,
  getImageById,
  updateImage,
  deleteImage
} from "../controllers/imageController.js";

const router = express.Router();

// Apply transformation middleware
router.use(transformIds('image'));

// UPLOAD IMAGE
router.post(
  "/upload",
  upload.fields([
    { name: "hero", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 }
  ]),
  uploadImage
);

// GET ALL IMAGES (Gallery page)
router.get("/", getAllImages);

// GET IMAGES BY PROGRAM (Program detail page)
router.get("/program/:program_id", getImagesByProgram);

// GET IMAGES BY TAG (Filter by category)
router.get("/tag/:tag_id", getImagesByTag);

// GET SINGLE IMAGE
router.get("/:id", getImageById);

// UPDATE IMAGE
router.put(
  "/:id",
  upload.fields([
    { name: "hero", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 }
  ]),
  updateImage
);

// DELETE IMAGE
router.delete("/:id", deleteImage);

export default router;
