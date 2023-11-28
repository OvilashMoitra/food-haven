import express, { Application } from "express";
import cors from "cors";
import { foodRouter } from "./app/routes/food.route";
export const app: Application = express();

// middleware
app.use(express.json());
app.use(cors());


app.use('/api/v1/food', foodRouter)