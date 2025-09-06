import { Response } from "express";

interface meta {
  limit: number;
  page: number;
  totalPage: number;
  [key: string]: number;
}

interface IData<T> {
  status: number;
  success: boolean;
  message: string;
  data?: T;
  meta?: meta;
}

export const sendResponse = <T>(res: Response, data: IData<T>) => {
  res.status(data.status).json({
    success: data.success,
    message: data.message,
    data: data.data ?? null,
    meta: data.meta ?? null,
  });
};
