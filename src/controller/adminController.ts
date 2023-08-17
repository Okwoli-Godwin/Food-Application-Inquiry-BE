import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../error/asyncHandler";
import bcrypt from "bcrypt";
import { AppError, HttpCode } from "../error/errorSpellOut";
import adminModel from "../Model/adminModel";

export const createAdmin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, fullname } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const checkIfUserExist = await adminModel.findOne({ email });

    if (checkIfUserExist) {
      return next(
        new AppError({
          message: "Admin Already Exist",
          httpCode: HttpCode.BAD_REQUEST,
        })
      );
    }

    const register = await adminModel.create({
      email,
      password: hash,
      fullname
    });

    return res.status(HttpCode.CREATED).json({
      message: "Admin created",
      data: register,
    });
  }
);

export const AdminLogin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body; // body

    const checkIfAminExist = await adminModel.findOne({ email });
    if (!checkIfAminExist) {
      return next(
        new AppError({
          message: "Email or password not correct",
          httpCode: HttpCode.BAD_REQUEST,
        })
      );
    }
    const CheckPassword = await bcrypt.compare(
      password,
      checkIfAminExist?.password!
    );

    if (!CheckPassword) {
      return next(
        new AppError({
          message: "Email or password not correct",
          httpCode: HttpCode.BAD_REQUEST,
        })
      );
    }

    return res.status(HttpCode.OK).json({
      message: "Sign In",
      data: checkIfAminExist,
    }); // Sign In
  }
);

export const deleteAdmin = async (req: Request, res: Response) => {
  try {
    const { adminID } = req.params;
    const deleteAdmin = await adminModel.findByIdAndDelete(adminID);

    return res.status(HttpCode.OK).json({
      message: "Admin deleted",
    });
  } catch (error) {
    return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
      message: "An error occurred in deleteAdmin",
      error: error,
    });
  }
};

export const viewAllRegisteredUsers = async (req: Request, res: Response) => {
  try {
    const getAllUsers = await adminModel.find();
    if (getAllUsers.length === 0) {
      return res.status(HttpCode.OK).json({
        message: "No user Avaliable",
      });
    }

    return res.status(HttpCode.OK).json({
      length: getAllUsers?.length,
      message: "Successfully Gotten All Users",
      data: getAllUsers,
    });
  } catch (error) {
    return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
      message: "An Error Occured in viewAllRegisteredUsers",
      error: error,
    });
  }
};