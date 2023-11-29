/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ApiError } from './ApiError';
import { config } from '../config';


const globalErrorHandler: ErrorRequestHandler = (
    error,
    req: Request,
    res: Response,
    next: NextFunction
) => {

    console.log(`globalErrorHandler `, { error })
    let statusCode = 500;
    let message = 'Something went wrong !';
    let errorMessages: unknown = [];

    if (error instanceof ApiError) {
        statusCode = error?.statusCode;
        message = error.message;
        errorMessages = error?.message
            ? [
                {
                    path: '',
                    message: error?.message,
                },
            ]
            : [];
    } else if (error instanceof Error) {
        message = error?.message;
        errorMessages = error?.message
            ? [
                {
                    path: '',
                    message: error?.message,
                },
            ]
            : [];
    }

    res.status(statusCode).json({
        success: false,
        statusCode: statusCode,
        message,
        errorMessages,
        stack: config.node_env !== 'production' ? error?.stack : undefined,
    });
};

export default globalErrorHandler;