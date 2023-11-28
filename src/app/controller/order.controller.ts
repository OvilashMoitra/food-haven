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

const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orderId = req.params.id
        const orderToDelete = await orderModel.deleteOrder(orderId)
        if (orderToDelete.deletedCount === 0) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Error deleting order')
        }

        sendResponse(res, StatusCodes.ACCEPTED, "Order deleted", orderToDelete)

    } catch (error) {
        next(error);
    }
}

const updateOrderStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orderId = req.params.id
        const orderToUpdate = req.body
        console.log({ orderId });
        const orderStatusToUpdate = await orderModel.updateOrderStatus(orderToUpdate, orderId)

        if (!orderStatusToUpdate) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Error updating order status')
        }

        sendResponse(res, StatusCodes.ACCEPTED, "Order status updated", orderStatusToUpdate)

    } catch (error) {
        next(error);
    }
}

const getOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orderId = req.params.id
        const order = await orderModel.getOrder(orderId)
        if (!order) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Error getting order')
        }
        sendResponse(res, StatusCodes.ACCEPTED, "Order fetched", order)
    } catch (error) {
        next(error);
    }
}

const getAllOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allOrder = await orderModel.getAllOrder()
        if (!allOrder) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Error getting all order')
        }
        sendResponse(res, StatusCodes.ACCEPTED, "All order fetched", allOrder)
    } catch (error) {
        next(error);
    }
}

export const orderController = {
    addOrder,
    deleteOrder,
    getAllOrder,
    getOrder,
    updateOrderStatus
}