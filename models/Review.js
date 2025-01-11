import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: false,
    },
    show: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Show",
      required: false,
    },
    rating: { type: Number, required: true, min: 0, max: 5 },
    comment: { type: String, min:10, max: 255 },
  },
  { timestamps: true }
);
export const Review = mongoose.model("Review", reviewSchema);