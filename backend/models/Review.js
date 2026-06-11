const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    websiteUrl: {
      type: String,
      required: true,
    },

    websiteName: {
      type: String,
      required: true,
    },

    websiteDescription: {
      type: String,
      required: true,
    },

    generatedReview: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Review", reviewSchema);