import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import * as dotenv from "dotenv";
import { tokenPayload } from "../@types/Token.type";

dotenv.config();


const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send("Token não fornecido");
  }

  const token = authorization.replace('Bearer', '').trim();

  if (!process.env.SECRET_KEY) {
    throw new Error("SECRET_KEY não definida no .env");
  }

  try {
    const data = jwt.verify(token, process.env.SECRET_KEY);
    
    console.log(data)

    const {id} = data as tokenPayload;

    req.userId = id;


    return next(); 
  } catch {
    return res.status(401).send("Token inválido");
  }
};

export default authMiddleware;
