import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import httpCodes from "http-status-codes";
import { sendResponse } from "./utils/send-response";
import { notFound } from "./middlewares/not-found";
import router from "./routes";
import { globalErrorHandler } from "./middlewares/global-error-handler";

const app = express();

app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true
}));
app.use(cookieParser());
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  sendResponse(res, {
    status: httpCodes.OK,
    success: true,
    message: "Welcome to digital wallet system",
  });
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
