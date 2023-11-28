import express from 'express';
import { orderController } from '../controller/order.controller';
export const orderRouter = express.Router();

orderRouter.post("/addOrder", orderController.addOrder)
// foodRouter.delete("/:id", foodController.deleteFoodItem)
// foodRouter.get("/:id", foodController.getFoodItem)
// foodRouter.get("/", foodController.getAllFoodItem)
// foodRouter.patch("/:id", foodController.updateFoodItem)