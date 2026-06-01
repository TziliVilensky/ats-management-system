import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    if (!(err instanceof AppError)) {
        console.error("Unexpected Error:", err);
        statusCode = 500;
        message = "Internal Server Error";
    }

    res.status(statusCode).json({
        success: false,
        message,
    });
};