import { IFood } from "../tsSchemas/food.schema";

export const countOrderTotalPrice = (payload: IFood[]): number => {
    let totalPrice: number = 0
    payload.forEach((item: IFood) => totalPrice += item.price)
    return totalPrice;
}