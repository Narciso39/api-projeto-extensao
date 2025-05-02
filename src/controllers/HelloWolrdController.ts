import { Request, Response } from "express";

export class HelloWorld {

    static async helloWorld(req: Request, res: Response) {
    

         return  res.send("Hello world");
      }

}