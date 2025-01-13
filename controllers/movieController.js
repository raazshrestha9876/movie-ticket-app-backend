import * as movieService from "../services/movieService.js";

export const addMovie = async (req, res) => {
  try {
    const movieData = req.body;
    const filePath = req.file.path;
    const movie = await movieService.addMovie(movieData, filePath);
    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllMovies = async (req, res) => {
  try {
    let filter = {};
    let sort = {};
    let skip = 0;
    let limit = 0;
    let page = 1;

    if(req.query.genre){
        filter.genre = {$in: req.query.genre}; 
    }
    if(req.query.sort){
        const sortField = req.query.sort.split(":")[0];
        const sortOrder = req.query.sort.split(":")[1] === 'asc' ? 1: -1;
        sort[sortField] = sortOrder;
    }
    if (req.query.page && req.query.limit) {
      page = parseInt(req.query.page);
      limit = parseInt(req.query.limit);
      skip = limit * (page - 1);
    }
    const { movies, totalCount } = await movieService.getAllMovies(skip, limit, sort, filter);
    res.status(200).json({
      data: movies,
      pagination: {
        total: totalCount,
        page: Math.ceil(skip / limit) + 1,
        limit,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMovieById = async (req, res) => {
  try {
    const movieId = req.params.id;
    const movie = await movieService.getMovieById(movieId);
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateMovie = async (req, res) => {
  try {
    const movieId = req.params.id;
    const movieData = req.body;
    const filePath = req.file.path;
    const updatedMovie = await movieService.updateMovie(
      movieId,
      movieData,
      filePath
    );
    res.status(200).json(updatedMovie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteMovie = async (req, res) => {
  try {
    const movieId = req.params.id;
    await movieService.deleteMovie(movieId);
    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
