import { NextFunction, Request, Response } from "express";
import { foodModel } from "../model/food.model";

const addFoodItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const foodItem = req.body
        const foodToAdd = await foodModel.addFoodItem(foodItem)
        if (!foodToAdd) {
            throw new Error('Error adding food item')
        }
        console.log(foodToAdd);
        res.status(200).json({
            status: 200,
            success: true,
            message: "food item added successfully",
            data: foodItem
        })
    } catch (error) {
        next(error);
    }
}

export const foodController = {
    addFoodItem
}