import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import httpCodes from "http-status-codes";
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.status(httpCodes.OK).json({
    success: true,
    message: "Welcome to digital wallet system",
  });
});

export default app;
