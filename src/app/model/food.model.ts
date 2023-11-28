import { IFood } from "../../tsSchemas/food.schema";
import { FoodModel } from "../mongooseSchema/food.mongooseSchema"

const addFoodItem = async (payload: IFood) => {
    const foodToAdd = new FoodModel(payload);
    await foodToAdd.save()
    return foodToAdd;
}



export const foodModel = {
    addFoodItem,
}