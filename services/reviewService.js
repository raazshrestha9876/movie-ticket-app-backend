import { Review } from "../models/Review.js";

export const createUserReview = async (data) => {
  try {
    const review = Review.create({
      user: data.userId,
      movie: data.movieId,
      show: data.showId,
      rating: data.rating,
      comment: data.comment,
    });
    return review;
  } catch (error) {
    throw error;
  }
};
export const getAllUserReview = async () => {
  try {
    const reviews = await Review.find().populate("movie").populate("show");
    return reviews;
  } catch (error) {
    throw error;
  }
};

export const getUserReview = async (userId) => {
  try {
    const review = await Review.find({ user: userId })
      .populate("movie")
      .populate("show");
    if(!review){
      throw new Error('No reviews found');
    }
    return review;
  } catch (error) {
    throw error;
  }
};

export const deleteUserReview = async (reviewId) => {
  try {
    const review = await Review.findByIdAndDelete(reviewId);
    if(review){
      throw new Error('Review not found');
    }
    return review;
  } catch (error) {
    throw error;
  }
};
