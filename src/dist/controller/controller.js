"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const asyncHandler_1 = require("../error/asyncHandler");
const bcrypt_1 = __importDefault(require("bcrypt"));
const errorSpellOut_1 = require("../error/errorSpellOut");
const userModel_1 = __importDefault(require("../Model/userModel"));
const UserEmail_1 = require("../email/UserEmail");
exports.createUser = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, fullname } = req.body;
    const salt = yield bcrypt_1.default.genSalt(10);
    const hash = yield bcrypt_1.default.hash(password, salt);
    const checkIfUserExist = yield userModel_1.default.findOne({ email });
    if (checkIfUserExist) {
        return next(new errorSpellOut_1.AppError({
            message: "Can't Use An Existing Email",
            httpCode: errorSpellOut_1.HttpCode.BAD_REQUEST,
        }));
    }
    const register = yield userModel_1.default.create({
        email,
        password: hash,
    });
    (0, UserEmail_1.VerifyAccount)(register);
    return res.status(errorSpellOut_1.HttpCode.CREATED).json({
        message: "user created",
        data: register,
    });
}));
