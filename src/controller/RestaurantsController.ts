import express,{ NextFunction, Request, Response, response } from "express";
import { asyncHandler } from "../error/asyncHandler";
import bcrypt from "bcrypt"
import { AppError, HttpCode } from "../error/errorSpellOut";
import restaurantModel from "../Model/restaurantModel";


export const viewAllSearchedRestaurant = async (req: Request, res: Response) => {
  try {
    const searchQuery = req.query;
    const findTheSearch = await restaurantModel.find(searchQuery!);

    if (findTheSearch.length === 0) {
      return res.status(HttpCode.NOT_FOUND).json({
        message: `No results found for search`,
      });
    }

    return res.status(HttpCode.OK).json({
      length: findTheSearch.length,
      message: "Successfully retrieved matching restaurants",
      data: findTheSearch,
    });
  } catch (error) {
    return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
      message: "An error occurred while searching for restaurants",
      error: error,
    });
  }
};



