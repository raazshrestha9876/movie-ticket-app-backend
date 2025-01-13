import { Movie } from "../models/Movie.js";
import { uploadImage } from "../utils/uploadImage.js";

export const addMovie = async (movieData, filePath) => {
  try {
    const { title, description, duration, genre, releaseDate, rating } =
      movieData;
    const poster = filePath;
    // Ensure genre is always an array of strings
    const genreArray = Array.isArray(genre) ? genre : [genre];
    // Upload the image to Cloudinary and get the URL
    const posterUrl = await uploadImage(poster);
    const movie = await Movie.create({
      title,
      description,
      duration,
      genre: genreArray,
      releaseDate,
      rating,
      poster: posterUrl,
    });

    return movie;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllMovies = async (skip, limit, sort, filter) => {
  const movies = await Movie.find(filter).sort(sort).skip(skip).limit(limit).exec();
  const totalCount = await Movie.countDocuments();
  return { movies, totalCount };
};

export const getMovieById = async (movieId) => {
  const movie = await Movie.findById(movieId);
  if (!movie) {
    throw new Error("Movie not found");
  }
  return movie;
};


export const updateMovie = async (movieId, movieData, filePath) => {
  const { title, description, duration, genre, releaseDate, rating } =
    movieData;
  const poster = filePath;

  const genreArray = Array.isArray(genre) ? genre : [genre];

  const posterUrl = await uploadImage(poster);

  const updateData = {
    title,
    description,
    duration,
    genre: genreArray,
    releaseDate,
    rating,
  };
  if (poster) {
    updateData.poster = posterUrl;
  }
  const movie = await Movie.findByIdAndUpdate(movieId, updateData, {
    new: true,
    runValidators: true,
  });
  if (!movie) {
    throw new Error("Movie not found");
  }
  return movie;
};

export const deleteMovie = async (movieId) => {
  const movie =await Movie.findByIdAndDelete(movieId);
  if (!movie) {
    throw new Error("Movie not found");
  }
  return movie;

};
