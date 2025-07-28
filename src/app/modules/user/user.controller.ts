/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, request, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { UserService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponce } from "../../utils/sendResponce";


const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserService.createUser(req.body);

    sendResponce (res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "User created successfully",
        data: user,
    });
})

const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const users = await UserService.getAllUsers();

    sendResponce (res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "All users fetched successfully",
        data: users.data,
        meta: users.meta,
    });
});

export const UserControllers = {
    createUser,
    getAllUsers
}


// rout matching -> controller -> service -> model -> db