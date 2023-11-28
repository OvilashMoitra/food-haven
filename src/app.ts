import express, { Application } from "express";
import cors from "cors";
export const app: Application = express();

// middleware
app.use(express.json());
app.use(cors());