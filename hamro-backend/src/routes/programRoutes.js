import express from "express";
import upload from "../middleware/upload.js";
import {
  createProgram,
  getAllPrograms,
  getProgramById,
  updateProgram,
  deleteProgram
} from "../controllers/programController.js";

const router = express.Router();

// CREATE
router.post("/create", upload.single("banner_image"), createProgram);

// READ ALL
router.get("/", getAllPrograms);

// READ ONE
router.get("/:id", getProgramById);

// UPDATE
router.put("/:id", upload.single("banner_image"), updateProgram);

// DELETE
router.delete("/:id", deleteProgram);

export default router;