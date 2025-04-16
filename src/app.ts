import dotenv from "dotenv";
import "express-async-errors";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import router from "./routers/routes";
import "reflect-metadata";
import { Request, Response, NextFunction } from "express";
import './config/db'
const app = express();

dotenv.config();
app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());
app.use(helmet());
app.use(router);
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Erro Interno do Servidor");
});
export default app;
