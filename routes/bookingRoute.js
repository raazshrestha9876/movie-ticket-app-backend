import express from "express";
import { body, param } from "express-validator";
import { createBooking, getUserBookings, getShowBookings, cancelBooking } from "../controllers/bookingController.js";
import { authenticate } from "../middlewares/authenticate.js";
import { validateRequest } from "../middlewares/validateRequest.js";

const router = express.Router();

const createBookingValidation = [
    body("showId").isMongoId().withMessage("Invalid Show ID"),
    body("seats").isInt({ min: 1 }).withMessage("Seats should be an positive integer "),
    body("showTime").isString().withMessage("Invalid Show Time"),
    body("totalAmount").isFloat({min: 0.01}).withMessage("Amount be in positive number"),
    body("seatsNumbers").isArray().custom((value) => value.length > 0).withMessage("seats numbers have at least one value"),
    validateRequest,
];

const showIdValidation = [
    param("showId").isMongoId().withMessage("Invalid show Id"),
    validateRequest,
];

const bookingIdValidation = [
    param("bookingId").isMongoId().withMessage(" Invalid booking Id"),
    validateRequest,
];

router.post("/", authenticate, createBookingValidation, createBooking);
router.get("/user", authenticate, getUserBookings);
router.get("/show/:showId", authenticate, showIdValidation, getShowBookings);
router.delete("/:bookingId", authenticate, bookingIdValidation, cancelBooking );

export { router as bookingRoute }