import { NextFunction, Request, Response } from "express";
import { ApiError } from "../../errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { sendResponse } from "../../shared/sendResponse";
import { reviewModel } from "../model/review.model";


const addReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reviewToAdd = req.body
        const addedReview = await reviewModel.addReview(reviewToAdd)
        if (!addedReview) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Error to submit review')
        }

        sendResponse(res, StatusCodes.ACCEPTED, "Successfully reviewed", addedReview)

    } catch (error) {
        next(error);
    }
}

const deleteReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reviewId = req.params.id
        const reviewToDelete = await reviewModel.deleteReview(reviewId)
        if (reviewToDelete.deletedCount === 0) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Error deleting review')
        }

        sendResponse(res, StatusCodes.ACCEPTED, "Review deleted", reviewToDelete)

    } catch (error) {
        next(error);
    }
}

const updateReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reviewId = req.params.id
        const reviewToUpdate = req.body

        const updatedReview = await reviewModel.updateReview(reviewToUpdate, reviewId)

        if (!updatedReview) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Error updating review')
        }

        sendResponse(res, StatusCodes.ACCEPTED, "Review updated", updatedReview)

    } catch (error) {
        next(error);
    }
}

const getReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reviewId = req.params.id
        const review = await reviewModel.getReview(reviewId)
        if (!review) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Error getting review')
        }
        sendResponse(res, StatusCodes.ACCEPTED, "Review fetched", review)
    } catch (error) {
        next(error);
    }
}

const getAllReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const foodReview = await reviewModel.getAllReview()
        if (!foodReview) {
            sendResponse(res, StatusCodes.ACCEPTED, 'No review found for food', [])
        }
        sendResponse(res, StatusCodes.ACCEPTED, "Food review fetched", foodReview)
    } catch (error) {
        next(error);
    }
}

export const reviewController = {
    addReview,
    deleteReview,
    getReview,
    getAllReview,
    updateReview
}