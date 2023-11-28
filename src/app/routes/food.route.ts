import express from 'express';
import { foodController } from '../controller/food.controller';
export const foodRouter = express.Router();

foodRouter.post("/addFood", foodController.addFoodItem)
foodRouter.delete("/:id", foodController.deleteFoodItem)
foodRouter.get("/:id", foodController.getFoodItem)
foodRouter.get("/", foodController.getAllFoodItem)
foodRouter.patch("/:id", foodController.updateFoodItem)