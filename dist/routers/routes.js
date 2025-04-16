"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserRoutes_1 = require("./UserRoutes");
const router = (0, express_1.Router)();
const userRoutes = new UserRoutes_1.UserRoutes();
router.use('/api/users', userRoutes.router);
exports.default = router;
