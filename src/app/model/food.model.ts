import { ApiError } from "../../errors/ApiError";
import { IFood } from "../../tsSchemas/food.schema";
import { FoodModel } from "../mongooseSchema/food.mongooseSchema"
import {
    StatusCodes
} from 'http-status-codes';

const addFoodItem = async (payload: IFood) => {
    const foodToAdd = new FoodModel(payload);
    await foodToAdd.save()
    return foodToAdd;
}

const deleteFoodItem = async (payload: string) => {
    const foodToDelete = await FoodModel.deleteOne({ _id: payload })
    return foodToDelete;
}

const updateFoodItem = async (payload: Partial<IFood>, id: string) => {

    const isFoodExist = await FoodModel.findById(id);

    if (!isFoodExist) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Food not found')
    }

    const foodToUpdate = await FoodModel.findByIdAndUpdate(id, payload, { new: true });
    return foodToUpdate;
}

const getFoodItem = async (id: string) => {
    const foodItem = await FoodModel.findById(id);
    return foodItem
}

const getAllFoodItem = async () => {
    const foodItem = await FoodModel.find({});
    return foodItem
}


export const foodModel = {
    addFoodItem,
    deleteFoodItem,
    updateFoodItem,
    getFoodItem,
    getAllFoodItem
}