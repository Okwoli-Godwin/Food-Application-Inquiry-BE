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
exports.viewAllRegisteredUsers = exports.deleteAdmin = exports.AdminLogin = exports.createAdmin = void 0;
const asyncHandler_1 = require("../error/asyncHandler");
const bcrypt_1 = __importDefault(require("bcrypt"));
const errorSpellOut_1 = require("../error/errorSpellOut");
const adminModel_1 = __importDefault(require("../Model/adminModel"));
exports.createAdmin = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, fullname } = req.body;
    const salt = yield bcrypt_1.default.genSalt(10);
    const hash = yield bcrypt_1.default.hash(password, salt);
    const checkIfUserExist = yield adminModel_1.default.findOne({ email });
    if (checkIfUserExist) {
        return next(new errorSpellOut_1.AppError({
            message: "Admin Already Exist",
            httpCode: errorSpellOut_1.HttpCode.BAD_REQUEST,
        }));
    }
    const register = yield adminModel_1.default.create({
        email,
        password: hash,
        fullname
    });
    return res.status(errorSpellOut_1.HttpCode.CREATED).json({
        message: "Admin created",
        data: register,
    });
}));
exports.AdminLogin = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body; // body
    const checkIfAminExist = yield adminModel_1.default.findOne({ email });
    if (!checkIfAminExist) {
        return next(new errorSpellOut_1.AppError({
            message: "Email or password not correct",
            httpCode: errorSpellOut_1.HttpCode.BAD_REQUEST,
        }));
    }
    const CheckPassword = yield bcrypt_1.default.compare(password, checkIfAminExist === null || checkIfAminExist === void 0 ? void 0 : checkIfAminExist.password);
    if (!CheckPassword) {
        return next(new errorSpellOut_1.AppError({
            message: "Email or password not correct",
            httpCode: errorSpellOut_1.HttpCode.BAD_REQUEST,
        }));
    }
    return res.status(errorSpellOut_1.HttpCode.OK).json({
        message: "Sign In",
        data: checkIfAminExist,
    }); // Sign In
}));
const deleteAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { adminID } = req.params;
        const deleteAdmin = yield adminModel_1.default.findByIdAndDelete(adminID);
        return res.status(errorSpellOut_1.HttpCode.OK).json({
            message: "Admin deleted",
        });
    }
    catch (error) {
        return res.status(errorSpellOut_1.HttpCode.INTERNAL_SERVER_ERROR).json({
            message: "An error occurred in deleteAdmin",
            error: error,
        });
    }
});
exports.deleteAdmin = deleteAdmin;
const viewAllRegisteredUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAllUsers = yield adminModel_1.default.find();
        if (getAllUsers.length === 0) {
            return res.status(errorSpellOut_1.HttpCode.OK).json({
                message: "No user Avaliable",
            });
        }
        return res.status(errorSpellOut_1.HttpCode.OK).json({
            length: getAllUsers === null || getAllUsers === void 0 ? void 0 : getAllUsers.length,
            message: "Successfully Gotten All Users",
            data: getAllUsers,
        });
    }
    catch (error) {
        return res.status(errorSpellOut_1.HttpCode.INTERNAL_SERVER_ERROR).json({
            message: "An Error Occured in viewAllRegisteredUsers",
            error: error,
        });
    }
});
exports.viewAllRegisteredUsers = viewAllRegisteredUsers;
