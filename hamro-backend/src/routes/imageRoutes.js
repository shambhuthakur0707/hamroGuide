import express from "express";
import upload from "../middleware/upload.js";
import { uploadImage } from "../controllers/imageController.js";


const router = express.Router();


router.post(
"/upload",
upload.fields([
{ name: "hero", maxCount: 1 },
{ name: "thumbnail", maxCount: 1 }
]),
uploadImage
);


export default router;