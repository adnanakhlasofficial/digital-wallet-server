import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Welcome to Digital Wallet System",
  });
});

export default app;
