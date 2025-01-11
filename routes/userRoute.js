import express from "express";
import { body, param } from "express-validator";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  logoutUser,
} from "../controllers/userController.js";
import { authenticate } from "../middlewares/authenticate.js";
import { validateRequest } from "../middlewares/validateRequest.js";

const router = express.Router();

router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("name is required"),
    body("email").isEmail().withMessage("A valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage(" password is less than 6 characters"),
  ],
  validateRequest,
  registerUser
);
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("A valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("password is less than 6 characters "),
  ],
  validateRequest,
  loginUser
);

router.get(
  "/profile/:id",
  [param("id").isMongoId().withMessage("Invalid user Id")],
  validateRequest,
  authenticate,
  getUserProfile
);
router.put(
  "/update-profile/:id",
  [
    param("id").isMongoId().withMessage("Invalid user Id"),
    body("name").optional().notEmpty().withMessage("Name cannot be empty"),
    body("email").optional().isEmail().withMessage("A valid email is required"),
    body("password")
      .optional()
      .isLength({ min: 6 })
      .withMessage("password is less than 6 characters"),
  ],
  validateRequest,
  authenticate,
  updateUserProfile
);
router.delete(
  "/delete-profile/:id",
  [param("id").isMongoId().withMessage("Invalid userId")],
  validateRequest,
  authenticate,
  deleteUser
);

router.get("/logout", authenticate, logoutUser);
export { router as userRoute };
