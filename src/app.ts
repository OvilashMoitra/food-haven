import express, { Application } from "express";
import cors from "cors";
import { foodRouter } from "./app/routes/food.route";
import { orderRouter } from "./app/routes/order.route";
import { reviewRouter } from "./app/routes/review.route";
import globalErrorHandler from "./errors/GlobalErrorHandlers";
export const app: Application = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use('/api/v1/food', foodRouter)
app.use('/api/v1/order', orderRouter)
app.use('/api/v1/review', reviewRouter)

app.use(globalErrorHandler)