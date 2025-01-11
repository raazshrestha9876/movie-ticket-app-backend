import * as movieService from '../services/movieService.js';

export const addMovie = async (req, res) => {
    try{
        const movieData = req.body;
        const filePath = req.file.path;
        const movie = await movieService.addMovie(movieData, filePath);
        res.status(201).json(movie);
    }catch(error){
        res.status(400).json({ message: error.message });
    }
}

export const getAllMovies = async (req, res) => {
    try{
        const movies = await movieService.getAllMovies();
        res.status(200).json(movies);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

export const getMovieById = async (req, res) => {
    try{
        const movieId = req.params.id;
        const movie = await movieService.getMovieById(movieId);
        res.status(200).json(movie);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

export const updateMovie = async (req, res) => {
    try{
        const movieId = req.params.id;
        const movieData = req.body;
        const filePath = req.file.path;
        const updatedMovie = await movieService.updateMovie(movieId, movieData, filePath);
        res.status(200).json(updatedMovie);
    }catch(error){
        res.status(400).json({ message: error.message });
    }
}

export const deleteMovie = async (req, res) => {
    try{
        const movieId = req.params.id;
        await movieService.deleteMovie(movieId);
        res.status(200).json({ message: 'Movie deleted successfully' });
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}