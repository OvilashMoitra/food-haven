import { Schema, model } from "mongoose";

export const foodSchema = new Schema({
    name: { type: "string", require: true },
    description: { type: "string", required: [true, 'Food Description is required'] },
    price: { type: "number", required: [true, 'Price is required'] },
    image: { type: "string", required: false },
    availability: { type: Boolean, default: false, required: [true, 'Availability is required'] },
})

export const FoodModel = model('foods', foodSchema);

