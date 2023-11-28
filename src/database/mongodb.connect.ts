import mongoose from 'mongoose';
import { config } from '../config';


export const mongodbConnection = async () => {
    try {
        await mongoose.connect(config.mongodb_connection_url!);
        console.log("mongodb connection succeeded");
    } catch (error) {
        console.log(error);
        console.log("Error connecting to MongoDB");
    }
}
