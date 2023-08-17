import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../error/asyncHandler";
import bcrypt from "bcrypt"
import { AppError, HttpCode } from "../error/errorSpellOut";
import userModel from "../Model/userModel";
import { VerifyAccount } from "../email/UserEmail";

export const createUser = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { email, password, fullname } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const checkIfUserExist = await userModel.findOne({ email })
        
        if (checkIfUserExist) {
      return next(
        new AppError({
          message: "Can't Use An Existing Email",
          httpCode: HttpCode.BAD_REQUEST,
        })
      );
        }
         const register = await userModel.create({
      email,
      password: hash,
    });

    VerifyAccount(register);

    return res.status(HttpCode.CREATED).json({
      message: "user created",
      data: register,
    });
    }
)