const express = require("express");

const router = express.Router();

const protect = require(
  "../middleware/authMiddleware"
);

const {
  generateReview,
  getReviews,
  deleteReview,
} = require(
  "../controllers/reviewController"
);

router.post(
  "/generate",
  protect,
  generateReview
);

router.get(
  "/",
  protect,
  getReviews
);

router.delete(
  "/:id",
  protect,
  deleteReview
);

module.exports = router;