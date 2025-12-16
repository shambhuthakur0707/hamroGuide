import Review from "../models/Review.js";

/**
 * Create a new review for a program
 */
export const createReview = async (req, res) => {
  try {
    const { programId, userName, rating, comment } = req.body;

    if (!programId || !userName || !rating || !comment) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (comment.length > 300) {
      return res.status(400).json({
        success: false,
        message: "Comment must be 300 characters or less",
      });
    }

    const review = await Review.create({
      programId,
      userName,
      rating,
      comment,
    });

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      data: review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add review",
      error: error.message,
    });
  }
};

/**
 * Get all reviews and rating summary for a program
 */
export const getProgramReviews = async (req, res) => {
  try {
    const { programId } = req.params;

    const reviews = await Review.find({ programId }).sort({
      createdAt: -1,
    });

    const totalReviews = reviews.length;

    const averageRating =
      totalReviews === 0
        ? 0
        : (
            reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
          ).toFixed(1);

    const ratingSummary = {
      5: reviews.filter(r => r.rating === 5).length,
      4: reviews.filter(r => r.rating === 4).length,
      3: reviews.filter(r => r.rating === 3).length,
      2: reviews.filter(r => r.rating === 2).length,
      1: reviews.filter(r => r.rating === 1).length,
    };

    res.status(200).json({
      success: true,
      totalReviews,
      averageRating,
      ratingSummary,
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
      error: error.message,
    });
  }
};
