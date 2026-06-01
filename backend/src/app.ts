import express, { Request, Response } from "express";
import { AppError } from "./errors/AppError";
import { ERROR_CODES } from "./errors/errorCodes";

import { errorHandler } from "./middleware/errorHandler";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.json({
        status: "UP",
        message: "ATS Backend is running",
    });
});

app.get("/error-test", (req, res, next) => {
    next(
        new AppError(
            "This is a test error",
            400,
            ERROR_CODES.VALIDATION_ERROR
        )
    );
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});