import { globalErrorHandler } from './app/middlewares/global-error-handler';

import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import routes from "./routes";
import cookiParser from "cookie-parser"; 

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookiParser()); 


app.get("/", (req: Request, res: Response) => {
  res.send("In the name of Allah");
});

app.use("/api/v1", routes);
app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    message: `cannot find ${req.originalUrl} on the server`,
  });
  next();
});