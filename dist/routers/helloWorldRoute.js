"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelloWorldRoute = void 0;
const express_1 = require("express");
const HelloWolrdController_1 = require("../controllers/HelloWolrdController");
class HelloWorldRoute {
    constructor() {
        this._router = (0, express_1.Router)();
        this.configureRoutes();
    }
    configureRoutes() {
        this.router.get("/", this.handleRequest(HelloWolrdController_1.HelloWorld.helloWorld));
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
exports.HelloWorldRoute = HelloWorldRoute;
exports.default = new HelloWorldRoute().router;
