import { Schema } from "mongoose"

// timestamp: Timestamp of when the order was placed.
export type IOrder = {
    email: string,
    contactNumber: string,
    items: Schema.Types.ObjectId[],
    address: string,
    price: number,
    status: OrderStatus,
    availability: boolean
}

export enum OrderStatus {
    pending = "pending",
    confirmed = "confirmed",
    delivered = "delivered"
}