import { Response } from "express";

interface TMeta {
    total: number;
}

interface TResponce<T> {
    statusCode: number;
    message: string;
    success: boolean;
    data: T;
    meta ?: TMeta;
}


export const sendResponce = <T>(res: Response, data: TResponce<T>) => {
    res.status(data.statusCode).json({
        statusCode: data.statusCode,
        success: data.success,
        message: data.message,
        meta: data.meta,
        data: data.data,
    });

}