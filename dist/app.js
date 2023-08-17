"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationConfig = void 0;
const express_1 = __importDefault(require("express"));
const errorSpellOut_1 = require("./error/errorSpellOut");
const errorHandler_1 = require("./error/errorHandler/errorHandler");
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const recipeRoutes_1 = __importDefault(require("./Routes/recipeRoutes"));
const adminRoutes_1 = __importDefault(require("./Routes/adminRoutes"));
const ApplicationConfig = (app) => {
    app.use(express_1.default.json())
        .use((0, cors_1.default)())
        .use((0, morgan_1.default)("dev"))
        .use("/api/recipes", recipeRoutes_1.default)
        .use("/api/admin", adminRoutes_1.default)
        .all("*", (req, res, next) => {
        next(new errorSpellOut_1.AppError({
            message: `Opps!! Are you lost??... This Route ${req.originalUrl} is Not Found`,
            httpCode: errorSpellOut_1.HttpCode.NOT_FOUND
        }));
    });
    app.use(errorHandler_1.errorHandler);
};
exports.ApplicationConfig = ApplicationConfig;
