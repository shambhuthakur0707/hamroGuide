import express from "express";
import upload from "../middleware/upload.js";
import { createProgram } from "../controllers/programController.js";


const router = express.Router();


router.post("/create", upload.single("banner_image"), createProgram);


export default router;