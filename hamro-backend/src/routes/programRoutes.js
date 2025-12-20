import express from "express";
import upload from "../middleware/upload.js";
import transformIds from "../middleware/transformIds.js";
import {
  createProgram,
  getAllPrograms,
  getProgramById,
  getProgramDetails,
  updateProgram,
  deleteProgram
} from "../controllers/programController.js";

const router = express.Router();

// Apply transformation middleware
router.use(transformIds("program"));

// CREATE
router.post("/create", upload.single("banner_image"), createProgram);

// READ ALL (lightweight)
router.get("/", getAllPrograms);

// READ ONE - COMPLETE DETAILS
router.get("/:id/details", getProgramDetails);

// READ ONE - BASIC INFO
router.get("/:id", getProgramById);

// UPDATE
router.put("/:id", upload.single("banner_image"), updateProgram);

// DELETE
router.delete("/:id", deleteProgram);

export default router;
