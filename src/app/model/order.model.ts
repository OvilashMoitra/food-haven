import { ApiError } from "../../errors/ApiError";
import { countOrderTotalPrice } from "../../helpers/countOrderPrice";
import { IFood } from "../../tsSchemas/food.schema";
import { IOrder, OrderStatus } from "../../tsSchemas/order.schema";
import { FoodModel } from "../mongooseSchema/food.mongooseSchema"
import {
    StatusCodes
} from 'http-status-codes';
import { OrderModel } from "../mongooseSchema/order.mongooseSchema";

const addOrder = async (payload: IOrder) => {

    const orderedItem = await FoodModel.find(
        {
            $and: [
                {
                    _id: { $in: payload.items }
                }
            ]
        }
    )


    let totalPrice;
    if (orderedItem.length > 0) {
        totalPrice = countOrderTotalPrice(orderedItem as IFood[])
    }

    const orderToAdd = new OrderModel({ ...payload, totalPrice });
    await orderToAdd.save()
    return orderToAdd;
}

const deleteOrder = async (payload: string) => {
    const orderToDelete = await OrderModel.deleteOne({ _id: payload })
    return orderToDelete;
}

const updateOrderStatus = async (payload: Partial<IOrder>, id: string) => {

    const isOrderExist = await OrderModel.findById(id);

    if (!isOrderExist) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Order not found')
    }

    const orderCurrentStatus = isOrderExist.status


    if ((orderCurrentStatus === OrderStatus.pending && payload.status === OrderStatus.confirmed)) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid order status transition')
    } else if (orderCurrentStatus === OrderStatus.confirmed && payload.status === OrderStatus.delivered) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid order status transition')
    }


    const orderToUpdate = await FoodModel.findByIdAndUpdate(id, payload, { new: true });
    return orderToUpdate;
}

const getOrder = async (id: string) => {
    const order = await OrderModel.findById(id);
    return order
}

const getAllOrder = async () => {
    const foodItem = await OrderModel.find({});
    return foodItem
}


export const orderModel = {
    addOrder,
    getOrder,
    getAllOrder,
    deleteOrder,
    updateOrderStatus
}