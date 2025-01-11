import {
  createShow,
  getShowById,
  getShowByMovie,
  updateShow,
  deleteShow,
} from "../controllers/showController.js";
import { authenticate } from "../middlewares/authenticate.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { body, param } from "express-validator";
import express from "express";

const router = express.Router();

const createShowValidation = [
  body("movieId").isMongoId().withMessage("Invalid Movie Id"),
  body("showDate")
    .isISO8601()
    .withMessage("Invalid Date format. Use YYYY-MM-DD.")
    .custom((value) => {
      const today = new Date();
      const showDate = new Date(value);
      if (showDate < today) {
        throw new Error("Show Date cannot be in the past");
      }
      return true;
    }),
  body("showTimes").isArray().withMessage("show Times must be an array"),
  body("availableSeats")
    .isArray()
    .withMessage("Available seats must be an array of seat numbers.")
    .custom((value) => value.length > 0)
    .withMessage("Available seats array should have at least one seat."),
  body("ticketPrice")
    .isFloat({ min: 0.01 })
    .withMessage("Price should be in positive number"),
  validateRequest,
];
const updateShowValidation = [
  param("id").isMongoId().withMessage("Invalid Show Id"),
  body("showDate")
    .isISO8601()
    .withMessage("Invalid Date format. Use YYYY-MM-DD.")
    .custom((value) => {
      const today = new Date();
      const showDate = new Date(value);
      if (showDate < today) {
        throw new Error("Show Date cannot be in the past");
      }
      return true;
    }),
  body("showTimes").isArray().withMessage("show Times must be an array"),
  body("availableSeats")
    .isArray()
    .withMessage("Available seats must be an array of seat numbers.")
    .custom((value) => value.length > 0)
    .withMessage("Available seats array should have at least one seat."),
  body("ticketPrice")
    .isFloat({ min: 0.01 })
    .withMessage("Price should be in positive number"),
  validateRequest,
];
const movieIdValidation = [
  param("movieId").isMongoId().withMessage("Invalid MovieId"),
  validateRequest,
];
const showIdValidation = [
  param("id").isMongoId().withMessage("Invalid Show Id"),
  validateRequest,
];

router.post("/", authenticate, createShowValidation, createShow);
router.get("/movie/:movieId", authenticate, movieIdValidation, getShowByMovie);
router.get("/:id", authenticate, showIdValidation, getShowById);
router.put("/:id", authenticate, updateShowValidation, updateShow);
router.delete("/:id", authenticate, showIdValidation, deleteShow);

export { router as showRoute };
