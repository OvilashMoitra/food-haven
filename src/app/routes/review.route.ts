import express from 'express';
import { reviewController } from '../controller/review.controller';

export const reviewRouter = express.Router();

reviewRouter.post("/addReview", reviewController.addReview)
reviewRouter.delete("/:id", reviewController.deleteReview)
reviewRouter.get("/:id", reviewController.getReview)
reviewRouter.get("/", reviewController.getAllReview)
reviewRouter.patch("/:id", reviewController.updateReview)