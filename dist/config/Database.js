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
exports.DBConnection = void 0;
const enviromentvariables_1 = require("../enviromentvariables/enviromentvariables");
const mongoose_1 = __importDefault(require("mongoose"));
const URL = enviromentvariables_1.environmentVariables.MONGODBCONNECT;
console.log(URL);
const DBConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conn = yield mongoose_1.default.connect(URL);
        if (mongoose_1.default.connection.host === "0.0.0.0") {
            console.log("Connected to localhost");
        }
        else {
            console.log("Database is live now");
        }
    }
    catch (error) {
        console.log("Database connection error: Couldn't connect because", error);
    }
});
exports.DBConnection = DBConnection;
