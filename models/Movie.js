import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true }, 
    genre: { type: [String], required: true },
    releaseDate: { type: Date, required: true }, 
    rating: { type: Number, required: true, min: 0, max: 10 }, 
    poster: { type: String, required: true }, 
  },
  { timestamps: true }
);

export const Movie = mongoose.model("Movie", movieSchema);
