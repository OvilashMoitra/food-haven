import { ApiError } from "../../errors/ApiError";
import { IReview } from "../../tsSchemas/review.schema";
import {
    StatusCodes
} from 'http-status-codes';
import { ReviewModel } from "../mongooseSchema/review.mongooseSchema";
import { OrderModel } from "../mongooseSchema/order.mongooseSchema";

const addReview = async (payload: IReview) => {

    const ifOrderExist = await OrderModel.exists({ _id: payload.orderId })

    if (!ifOrderExist) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Order not found')
    }

    const reviewToAdd = new ReviewModel(payload);
    await reviewToAdd.save()
    return reviewToAdd;
}

const deleteReview = async (payload: string) => {
    const reviewToDelete = await ReviewModel.deleteOne({ _id: payload })
    return reviewToDelete;
}

const updateReview = async (payload: Partial<IReview>, id: string) => {

    const ifOrderExist = await OrderModel.exists({ _id: payload.orderId })

    if (!ifOrderExist) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Order not found')
    }

    const reviewToUpdate = await ReviewModel.findByIdAndUpdate(id, payload, { new: true });
    return reviewToUpdate;
}

const getReview = async (id: string) => {
    const review = await ReviewModel.findById(id);
    return review
}

const getReviewByFood = async (orderId: string) => {
    const foodReview = await ReviewModel.find({ orderId });
    return foodReview
}


export const foodModel = {
    getReview,
    getReviewByFood,
    addReview,
    deleteReview,
    updateReview
}