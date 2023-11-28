import express from 'express';
import { foodController } from '../controller/food.controller';
export const foodRouter = express.Router();

foodRouter.post("/addFood", foodController.addFoodItem)