import express from "express";
import { body, param } from "express-validator";
import {
  addMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
} from "../controllers/movieController.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { authenticate } from "../middlewares/authenticate.js";
import { imageValidator } from "../middlewares/imageValidator.js";
import upload from '../middlewares/multer.js';


const router = express.Router();

//validation rules for adding a movie
const addMovieValidation = [
  body("title")
    .isString()
    .withMessage("Title is required and should be string"),
  body("genre")
    .isArray()
    .withMessage("Genre should be an array")
    .custom((value) => value.length > 0)
    .withMessage("Genre should have at least one value"),
  body("description")
    .isString()
    .withMessage("Description is required and should be a string"),
  body("releaseDate").isISO8601().withMessage("Invalid release date format"),
  body("duration")
    .isInt({ min: 1 })
    .withMessage("Duration should be a positive integer "),
  body("rating")
    .isFloat({ min: 1, max: 10 })
    .withMessage("Rating should be between 0 and 10"),
  imageValidator,
  validateRequest,
];

const updateMovieValidation = [
  param("id").isMongoId().withMessage("Invalid movie ID"),
  body("title").optional().isString().withMessage("Title should be string"),
  body("genre")
    .optional()
    .isArray()
    .withMessage("Genre should be an array")
    .custom((value) => value.length > 0)
    .withMessage("Genre should have at least one value"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description should be a string"),
  body("releaseDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid release date format"),
  body("duration")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Duration should a positive integer "),
  body("rating")
    .optional()
    .isFloat({ min: 1, max: 10 })
    .withMessage("Rating should be between 0 and 10"),
  imageValidator,
  validateRequest,
];

const movieIdValidation = [
  param("id").isMongoId().withMessage("Invalid Movie Id"),
  validateRequest,
];

router.post(
  "/",
  authenticate,
  upload.single("poster"),
  addMovieValidation,
  addMovie
);
router.get("/", authenticate, getAllMovies);
router.get("/:id", authenticate, movieIdValidation, getMovieById);
router.put(
  "/:id",
  authenticate,
  upload.single("poster"),
  updateMovieValidation,
  updateMovie
);
router.delete("/:id", authenticate, movieIdValidation, deleteMovie);

export { router as movieRoute };
