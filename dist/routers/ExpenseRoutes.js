"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseRoutes = void 0;
const express_1 = require("express");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const ExpenseController_1 = require("../controllers/ExpenseController");
class ExpenseRoutes {
    constructor() {
        this._router = (0, express_1.Router)();
        this.configureRoutes();
    }
    configureRoutes() {
        this.router.get("/", authMiddleware_1.default, this.handleRequest(ExpenseController_1.ExpenseController.showExpense));
        this.router.post("/", authMiddleware_1.default, this.handleRequest(ExpenseController_1.ExpenseController.createExpense));
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
