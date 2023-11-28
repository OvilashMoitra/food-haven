/*
name: { type: "string", require: true },
    description: { type: "string", required: [true, 'Food Description is required'] },
    price: { type: "number", required: [true, 'Price is required'] },
    image: { type: "string", required: false },
    availability: { type: Boolean, default: false, required: [true, 'Availability is required'] },
    */

export type IFood = {
    name: string,
    price: number,
    image: string,
    description: string,
    availability: boolean
}