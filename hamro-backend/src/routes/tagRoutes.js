import express from "express";
import { createTag } from "../controllers/tagController.js";


const router = express.Router();
router.post("/create", createTag);
export default router;