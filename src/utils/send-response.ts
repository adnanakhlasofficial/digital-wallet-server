import { Response } from "express";

interface IData<T> {
  status: number;
  success: boolean;
  message: string;
  data?: T;
}

export const sendResponse = <T>(res: Response, data: IData<T>) => {
  res.status(data.status).json({
    success: data.success,
    message: data.message,
    data: data.data ?? null,
  });
};
