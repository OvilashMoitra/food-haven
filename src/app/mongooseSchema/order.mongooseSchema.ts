import { Schema, model } from "mongoose";
import { IOrder, OrderStatus } from "../../tsSchemas/order.schema";

const orderSchema = new Schema<IOrder>(
    {
        email: { type: "string", required: [true, 'Email is required'] },
        contactNumber: { type: "string", required: [true, 'Contact number is required'] },
        items: { type: [Schema.Types.ObjectId], required: [true, 'Order item is required'] },
        status: { type: String, enum: OrderStatus, default: OrderStatus.pending },
        totalPrice: { type: Number, required: [true, 'Total price is required'] },
        address: { type: "string", required: [true, 'Address is required'] }
    },
    { timestamps: true }
)

export const OrderModel = model('orders', orderSchema)