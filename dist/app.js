"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const routes_1 = __importDefault(require("./routers/routes"));
require("reflect-metadata");
require("./config/db");
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(express_1.default.json());
app.use((0, morgan_1.default)("tiny"));
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(routes_1.default);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Erro Interno do Servidor");
});
exports.default = app;
