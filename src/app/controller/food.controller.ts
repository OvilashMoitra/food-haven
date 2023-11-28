import { NextFunction, Request, Response } from "express";
import { foodModel } from "../model/food.model";
import { ApiError } from "../../errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { sendResponse } from "../../shared/sendResponse";

const addFoodItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const foodItem = req.body
        const foodToAdd = await foodModel.addFoodItem(foodItem)
        if (!foodToAdd) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Error adding food item')
        }

        sendResponse(res, StatusCodes.ACCEPTED, "Food item added", foodToAdd)

    } catch (error) {
        next(error);
    }
}

const deleteFoodItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const foodItemId = req.params.id
        const foodToDelete = await foodModel.deleteFoodItem(foodItemId)
        if (!foodToDelete) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Error deleting food item')
        }

        sendResponse(res, StatusCodes.ACCEPTED, "Food item deleted", foodToDelete)

    } catch (error) {
        next(error);
    }
}

const updateFoodItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const foodItemId = req.params.id
        console.log({ foodItemId });
        const foodToUpdate = req.body
        const foodItemToUpdate = await foodModel.updateFoodItem(foodToUpdate, foodItemId)

        if (!foodItemToUpdate) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Error updating food item')
        }

        sendResponse(res, StatusCodes.ACCEPTED, "Food item updated", foodItemToUpdate)

    } catch (error) {
        next(error);
    }
}

const getFoodItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const foodItemId = req.params.id
        const foodItem = await foodModel.getFoodItem(foodItemId)
        if (!foodItem) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Error getting food item')
        }
        sendResponse(res, StatusCodes.ACCEPTED, "Food item fetched", foodItem)
    } catch (error) {
        next(error);
    }
}

const getAllFoodItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allFoodItem = await foodModel.getAllFoodItem()
        if (!allFoodItem) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Error getting all food item')
        }
        sendResponse(res, StatusCodes.ACCEPTED, "All Food item fetched", allFoodItem)
    } catch (error) {
        next(error);
    }
}

export const foodController = {
    addFoodItem,
    getAllFoodItem,
    updateFoodItem,
    deleteFoodItem,
    getFoodItem
}