"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseRoutes = void 0;
const express_1 = require("express");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const UserController_1 = require("../controllers/UserController");
class ExpenseRoutes {
    constructor() {
        this._router = (0, express_1.Router)();
        this.configureRoutes();
    }
    configureRoutes() {
        // Rotas protegidas por padrão jwt com o authMiddleware
        this.router.get("/", authMiddleware_1.default, this.handleRequest(UserController_1.UserController.getAllUsers));
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
exports.ExpenseRoutes = ExpenseRoutes;
exports.default = new ExpenseRoutes().router;
