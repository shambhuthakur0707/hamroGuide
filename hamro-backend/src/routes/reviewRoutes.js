import express from "express";
import {
  createReview,
  getProgramReviews,
  updateReview,
  deleteReview
} from "../controllers/reviewController.js";

const router = express.Router();

// CREATE review
router.post("/", createReview);

// READ reviews for a program
router.get("/program/:programId", getProgramReviews);

// UPDATE review
router.put("/:id", updateReview);

// DELETE review
router.delete("/:id", deleteReview);

export default router;
