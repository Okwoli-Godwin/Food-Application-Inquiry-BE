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
exports.viewAllSearchedRestaurant = void 0;
const errorSpellOut_1 = require("../error/errorSpellOut");
const restaurantModel_1 = __importDefault(require("../Model/restaurantModel"));
const viewAllSearchedRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchQuery = req.query;
        const findTheSearch = yield restaurantModel_1.default.find(searchQuery);
        if (findTheSearch.length === 0) {
            return res.status(errorSpellOut_1.HttpCode.NOT_FOUND).json({
                message: `No results found for search`,
            });
        }
        return res.status(errorSpellOut_1.HttpCode.OK).json({
            length: findTheSearch.length,
            message: "Successfully retrieved matching restaurants",
            data: findTheSearch,
        });
    }
    catch (error) {
        return res.status(errorSpellOut_1.HttpCode.INTERNAL_SERVER_ERROR).json({
            message: "An error occurred while searching for restaurants",
            error: error,
        });
    }
});
exports.viewAllSearchedRestaurant = viewAllSearchedRestaurant;
