const express = require("express");

// const {
//   createReviewValidator,
//   updateReviewValidator,
//   getReviewValidator,
//   deleteReviewValidator,
// } = require("../utils/validators/reviewValidator");

const {
  getReview,
  getReviews,
  createReview,
  updateReview,
  deleteReview,
} = require("../services/reviewservice");

const authService = require("../services/authService");

const router = express.Router();

router.route("/").get(getReviews).post(
  authService.protect,
  authService.allowedTo("user"),

  createReview
);

router
  .route("/:id")
  .get(getReview)
  .put(
    authService.protect,
    authService.allowedTo("user"),

    updateReview
  )
  .delete(
    authService.protect,
    authService.allowedTo("user", "manager", "admin"),

    deleteReview
  );

module.exports = router;
