import { Show } from "../models/Show.js";

export const createShow = async (showData) => {
  try {
    const { movieId, showDate, showTimes, availableSeats, ticketPrice } =
      showData;

    const existingShow = await Show.findById(movieId);
    if (existingShow) {
      throw new Error("Show already exists");
    }

    const show = await Show.create({
      movie: movieId,
      showDate,
      showTimes,
      availableSeats,
      ticketPrice,
    });
    const populatedShow = await show.populate("movie");
    return populatedShow;
  } catch (error) {
    throw error;
  }
};

export const getShowByMovie = async (movieId) => {
  try {
    const show = await Show.find({ movie: movieId }).populate("movie");
    return show;
  } catch (error) {
    throw error;
  }
};

export const getShowById = async (showId) => {
  try {
    const show = await Show.findById(showId).populate("movie");
    if (!show) {
      throw new Error("Show not found");
    }
    return show;
  } catch (error) {
    throw error;
  }
};

export const updateShow = async (showId, showData) => {
  try {
    const { showDate, showTimes, availableSeats, ticketPrice } = showData;
    const show = await Show.findByIdAndUpdate(
      showId,
      {
        showDate,
        showTimes,
        availableSeats,
        ticketPrice,
      },
      { new: true }
    );
    if (!show) {
      throw new Error("Show not found");
    }
    return show;
  } catch (error) {
    throw error;
  }
};
export const deleteShow = async (showId) => {
  try {
    const show = await Show.findByIdAndDelete(showId);
    if (!show) {
      throw new Error("Show not found");
    }
    return show;
  } catch (error) {
    throw error;
  }
};
