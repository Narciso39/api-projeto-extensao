import { Router, Request, Response, NextFunction } from "express";
import { HelloWorld } from "../controllers/HelloWolrdController";

export class HelloWorldRoute {
  private readonly _router: Router;

  constructor() {
    this._router = Router();
    this.configureRoutes();
  }

  private configureRoutes(): void {
    this.router.get("/", this.handleRequest(HelloWorld.helloWorld));
  }

  private handleRequest(
    handler: (req: Request, res: Response) => Promise<any>
  ) {
    return (req: Request, res: Response, next: NextFunction) => {
      Promise.resolve(handler(req, res)).catch(next);
    };
  }
  public get router(): Router {
    return this._router;
  }
}

export default new HelloWorldRoute().router;
