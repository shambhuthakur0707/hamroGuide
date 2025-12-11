import express from "express";
import upload from "../middleware/upload.js";
import {
  createHeroSlide,
  getAllHeroSlides,
  getActiveHeroSlides,
  getHeroSlideById,
  updateHeroSlide,
  deleteHeroSlide
} from "../controllers/heroSlideController.js";

const router = express.Router();

// CREATE
router.post("/create", upload.single("image"), createHeroSlide);

// READ ALL (for admin)
router.get("/", getAllHeroSlides);

// READ ACTIVE ONLY (for frontend)
router.get("/active", getActiveHeroSlides);

// READ ONE
router.get("/:id", getHeroSlideById);

// UPDATE
router.put("/:id", upload.single("image"), updateHeroSlide);

// DELETE
router.delete("/:id", deleteHeroSlide);

export default router;