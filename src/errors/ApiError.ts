export class ApiError extends Error {
    statusCode: number
    stack?: string;
    constructor(statusCode: number, message: string, stack: string = "") {
        super(message)
        this.message = message
        this.statusCode = statusCode
        this.stack = stack
    }
}