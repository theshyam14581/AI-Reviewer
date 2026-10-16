const Review = require("../models/Review");

const generateReviewAI = require(
  "../services/geminiService"
);


// Generate Review

exports.generateReview = async (
  req,
  res
) => {

  try {

    const {
      websiteUrl,
      websiteName,
      websiteDescription,
    } = req.body;

    const reviewText =
      await generateReviewAI(
        websiteName,
        websiteUrl,
        websiteDescription
      );

    const review =
      await Review.create({
        userId: req.user.id,
        websiteUrl,
        websiteName,
        websiteDescription,
        generatedReview: reviewText,
      });

    res.status(201).json({
      success: true,
      review,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};



// Get All Reviews

exports.getReviews = async (
  req,
  res
) => {

  try {

    const reviews =
      await Review.find({
        userId: req.user.id,
      }).sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      reviews,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};



// Delete Review

exports.deleteReview = async (
  req,
  res
) => {

  try {

    const review =
      await Review.findById(
        req.params.id
      );

    if (!review) {
      return res.status(404).json({
        success: false,
        message:
          "Review not found",
      });
    }

    if (
      review.userId.toString() !==
      req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await Review.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message:
        "Review deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};