import express from "express";
import transformIds from "../middleware/transformIds.js";
import {
  createVideo,
  getAllVideos,
  getVideosByProgram,  // NEW
  getVideoById,
  updateVideo,
  deleteVideo
} from "../controllers/videoController.js";

const router = express.Router();

router.use(transformIds('video'));

router.post("/create", createVideo);
router.get("/", getAllVideos);
router.get("/program/:program_id", getVideosByProgram);  // NEW
router.get("/:id", getVideoById);
router.put("/:id", updateVideo);
router.delete("/:id", deleteVideo);

export default router;