import * as showService from "../services/showService.js";

export const createShow = async (req, res) => {
  try {
    const movieData = req.body;
    const show = await showService.createShow(movieData);
    res.status(201).json(show);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getShowByMovie = async (req, res) => {
  try {
    const movieId  = req.params.movieId;
    const show = await showService.getShowByMovie(movieId);
    res.status(200).json(show);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getShowById = async (req, res) => {
  try {
    const showId = req.params.id;
    const show = await showService.getShowById(showId);
    res.status(200).json(show);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const updateShow = async (req, res) => {
  try {
    const showId = req.params.id;
    const showData = req.body;
    const show = await showService.updateShow(showId, showData);
    res.status(200).json(show);
  } catch (error) {
    res.status(400).json({ message: "failed to update show" });
  }
};

export const deleteShow = async (req, res) => {
  try {
    const showId = req.params.id;
    await showService.deleteShow(showId);
    res.status(200).json({ message: "Show deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "failed to delete show" });
  }
};
