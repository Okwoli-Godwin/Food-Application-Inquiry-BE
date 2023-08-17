import express, { Application, NextFunction, Request, Response } from "express"
import { AppError, HttpCode } from "./error/errorSpellOut"
import { errorHandler } from "./error/errorHandler/errorHandler"
import cors from "cors"
import morgan from "morgan"
import RecipeRoute from "./Routes/recipeRoutes";
import AdminRoute from "./Routes/adminRoutes"

export const ApplicationConfig = (app: Application) => {
    app.use(express.json())
        .use(cors())
        .use(morgan("dev"))

    .use("/api/recipes", RecipeRoute)
    .use("/api/admin", AdminRoute)
    
        .all("*", (req: Request, res: Response, next: NextFunction) => {
            next(
                new AppError({
                    message: `Opps!! Are you lost??... This Route ${req.originalUrl} is Not Found`,
                    httpCode: HttpCode.NOT_FOUND
            })
        )
        })
    app.use(errorHandler)
}