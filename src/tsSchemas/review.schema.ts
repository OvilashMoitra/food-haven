import { Schema } from "mongoose";

export type IReview = {
    orderId: Schema.Types.ObjectId;
    review: string;
    rating: number
}