"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
class UserRoutes {
    constructor() {
        this._router = (0, express_1.Router)();
        this.configureRoutes();
    }
    configureRoutes() {
        // Rotas GET
        this.router.get("/", authMiddleware_1.default, this.handleRequest(UserController_1.UserController.getAllUsers));
        // this.router.get('/:id', this.handleRequest(UserController.getUserById));
        // Rotas POST
        this.router.post("/", this.handleRequest(UserController_1.UserController.createUser));
        this.router.post("/auth", this.handleRequest(AuthController_1.default.authenticate));
        // Rotas PUT/PATCH
        this.router.put("/:id", this.handleRequest(UserController_1.UserController.updateUser));
        this.router.patch("/:id", this.handleRequest(UserController_1.UserController.updateUser));
        // Rotas DELETE
        this.router.delete("/:id", this.handleRequest(UserController_1.UserController.deleteUser));
    }
    handleRequest(handler) {
        return (req, res, next) => {
            Promise.resolve(handler(req, res)).catch(next);
        };
    }
    get router() {
        return this._router;
    }
}
exports.UserRoutes = UserRoutes;
exports.default = new UserRoutes().router;
