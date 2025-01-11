import * as reviewService from "../services/reviewService.js";

export const createUserReview = async (req, res) => {
  try {
    const { rating, comment, movieId, showId } = req.body;
    const userId = req.user.id;
    const review = await reviewService.createUserReview({ rating, comment, movieId, showId, userId });
    res.status(201).json({ message: 'User reviewed successfully', review });
  } catch (error) {
    res.status(400).json({ message: 'Error creating user review', error });
  }
};

export const getAllUserReview = async (req, res) => {
  try {
    const reviews = await reviewService.getAllUserReview();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user reviews', error });
  }
};

export const getUserReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const review = await reviewService.getUserReview(userId);
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user review', error });
  }
};

export const deleteUserReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    await reviewService.deleteUserReview(reviewId);
    res.status(200).json({ message: 'Review deleted successfully'});
  } catch (error) {
    res.status(500).json({ message: 'failed to delete review', error });
  }
};
