// import { Router, Request, Response, NextFunction } from "express";
// import authMiddleware from "../middlewares/authMiddleware";
// import AuthController from "../controllers/AuthController";
// import { UserController } from "../controllers/UserController";

// export class ExpenseRoutes {
//   private readonly _router: Router;

//   constructor() {
//     this._router = Router();
//     this.configureRoutes();
//   }

//   private configureRoutes(): void {
    
//     this.router.get("/", authMiddleware, this.handleRequest(UserController.getAllUsers));

  

  
//   }

//   private handleRequest(
//     handler: (req: Request, res: Response) => Promise<any>
//   ) {
//     return (req: Request, res: Response, next: NextFunction) => {
//       Promise.resolve(handler(req, res)).catch(next);
//     };
//   }
//   public get router(): Router {
//     return this._router;
//   }
// }

// export default new ExpenseRoutes().router;
