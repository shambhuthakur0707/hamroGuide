import express from "express";
import {
  createReview,
  getProgramReviews,
} from "../controllers/reviewController.js";

const router = express.Router();

/**
 * Create a new review
 * POST /api/reviews
 */
router.post("/", createReview);

/**
 * Get all reviews + rating summary for a program
 * GET /api/reviews/program/:programId
 */
router.get("/program/:programId", getProgramReviews);

export default router;
