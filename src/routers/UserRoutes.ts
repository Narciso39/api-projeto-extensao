import { Router, Request, Response, NextFunction } from "express";
import { UserController } from "../controllers/UserController";
import authMiddleware from "../middlewares/authMiddleware";
import AuthController from "../controllers/AuthController";

export class UserRoutes {
  private readonly _router: Router;

  constructor() {
    this._router = Router();
    this.configureRoutes();
  }

  private configureRoutes(): void {
    // Rotas GET
    this.router.get("/", authMiddleware, this.handleRequest(UserController.getAllUsers));
    // this.router.get('/:id', this.handleRequest(UserController.getUserById));

    // Rotas POST
    this.router.post("/", this.handleRequest(UserController.createUser));
    this.router.post("/auth", this.handleRequest(AuthController.authenticate));
    // Rotas PUT/PATCH
    this.router.put("/:id", this.handleRequest(UserController.updateUser));
    this.router.patch("/:id", this.handleRequest(UserController.updateUser));

    // Rotas DELETE
    this.router.delete("/:id", this.handleRequest(UserController.deleteUser));
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

export default new UserRoutes().router;
