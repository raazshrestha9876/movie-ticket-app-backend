import express from 'express';
import { createUserReview, getAllUserReview, getUserReview, deleteUserReview } from '../controllers/reviewController.js';
import { authenticate } from '../middlewares/authenticate.js';
import { body, param } from 'express-validator';
import { validateRequest } from '../middlewares/validateRequest.js';

const router = express.Router();

const createReviewValidation = [
    body('movieId').isMongoId().withMessage('Invalid movie Id').optional(),
    body('showId').isMongoId().withMessage('Invalid show Id').optional(),
    body('rating').isFloat({ min: 0, max: 5}).withMessage('Rating is positive number'),
    body('comment').isString({min: 10, max: 255}).withMessage('comment should be at least 10 characters'),
    validateRequest,
]

const reivewIdValidation = [
    param('id').isMongoId().withMessage('Invalid Review Id')
]

router.post('/',authenticate, createReviewValidation,  createUserReview);
router.get('/',authenticate, getAllUserReview);
router.get('/user',authenticate, getUserReview),
router.delete('/:id',authenticate, reivewIdValidation, deleteUserReview);

export { router as reviewRoute };





