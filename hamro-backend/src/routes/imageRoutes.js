import express from "express";
import upload from "../middleware/upload.js";
import {
  uploadImage,
  getAllImages,
  getImageById,
  deleteImage
} from "../controllers/imageController.js";

const router = express.Router();

// CREATE
router.post(
  "/upload",
  upload.fields([
    { name: "hero", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 }
  ]),
  uploadImage
);

// READ ALL
router.get("/", getAllImages);

// READ ONE
router.get("/:id", getImageById);

// DELETE
router.delete("/:id", deleteImage);

export default router;