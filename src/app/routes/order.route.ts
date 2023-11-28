import express from 'express';
import { orderController } from '../controller/order.controller';
export const orderRouter = express.Router();

orderRouter.post("/addOrder", orderController.addOrder)
orderRouter.delete("/:id", orderController.deleteOrder)
orderRouter.get("/:id", orderController.getOrder)
orderRouter.get("/", orderController.getAllOrder)
orderRouter.patch("/:id/update-status", orderController.updateOrderStatus)