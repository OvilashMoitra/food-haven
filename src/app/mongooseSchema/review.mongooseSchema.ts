import { Schema, model } from "mongoose";
import { IReview } from "../../tsSchemas/review.schema";

export const foodReviewSchema = new Schema<IReview>({
    orderId: { type: Schema.Types.ObjectId, required: true },
    rating: { type: Number, required: [true, "Rating is required"], min: 1, max: 5 },
    review: { type: String, required: [true, "Review is required"] }
})


export const ReviewModel = model('reviews', foodReviewSchema)