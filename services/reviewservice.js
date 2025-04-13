const Review = require("../models/reviwModel");
const factory = require("./handlerFactory");

// @desc  get list of Review
// @route GET /api/v1/Review
//@access  puplic
exports.getReviews = factory.getAll(Review);

// @desc  get specific Review by id
// @route GET /api/v1/Review/:id
// @access puplic
exports.getReview = factory.getOne(Review);

// @desc  create Review
// @route POST /api/v1/Review
// @access  private/protect/user
exports.createReview = factory.create(Review);

// @desc update specific Review
// @route PUT /api/v1/Review/:id
// @access  private/protect/user
// @access private

exports.updateReview = factory.update(Review);

// @desc delete specific Review
// @route DELETE /api/v1/Review/:id
// @access  private/protect/user
// @access  private/protect/admin-Manager
// @access private

exports.deleteReview = factory.delete(Review);
