"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserRoutes_1 = require("./UserRoutes");
const ExpenseRoutes_1 = require("./ExpenseRoutes");
const helloWorldRoute_1 = require("./helloWorldRoute");
const router = (0, express_1.Router)();
const userRoutes = new UserRoutes_1.UserRoutes();
const expenseRoutes = new ExpenseRoutes_1.ExpenseRoutes();
const hello = new helloWorldRoute_1.HelloWorldRoute();
router.use('/', hello.router);
router.use('/api/users', userRoutes.router);
router.use('/api/expenses', expenseRoutes.router);
exports.default = router;
