import express from "express";
import {
  createVideo,
  getAllVideos,
  getVideoById,
  updateVideo,
  deleteVideo
} from "../controllers/videoController.js";

const router = express.Router();

// CREATE
router.post("/create", createVideo);

// READ ALL
router.get("/", getAllVideos);

// READ ONE
router.get("/:id", getVideoById);

// UPDATE
router.put("/:id", updateVideo);

// DELETE
router.delete("/:id", deleteVideo);

export default router;