import { NextFunction, Request, Response } from "express";
import { ApiError } from "../../errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { sendResponse } from "../../shared/sendResponse";
import { orderModel } from "../model/order.model";

const addOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orderToAdd = req.body
        const addedOrder = await orderModel.addOrder(orderToAdd)
        if (!addedOrder) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Error initializing order')
        }

        sendResponse(res, StatusCodes.ACCEPTED, "Successfully initialized order ", addedOrder)

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

export const orderController = {
    addOrder
}