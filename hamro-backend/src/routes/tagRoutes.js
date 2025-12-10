import express from "express";
import {
  createTag,
  getAllTags,
  getTagById,
  updateTag,
  deleteTag
} from "../controllers/tagController.js";

const router = express.Router();

// CREATE
router.post("/create", createTag);

// READ ALL
router.get("/", getAllTags);

// READ ONE
router.get("/:id", getTagById);

// UPDATE
router.put("/:id", updateTag);

// DELETE
router.delete("/:id", deleteTag);

export default router;