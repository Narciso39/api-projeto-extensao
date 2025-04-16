"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserEntity_1 = require("../entities/UserEntity");
// import UserModel from "src/models/UserModel";
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
class AuthController {
    static authenticate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            // const repository = User.repository(user);
            const user = yield UserEntity_1.User.repository.findOneBy({ email });
            if (!user) {
                return res.sendStatus(401);
            }
            const isValidPassowrd = yield bcryptjs_1.default.compare(password, user.password);
            if (!isValidPassowrd) {
                return res.sendStatus(401);
            }
            if (!process.env.SECRET_KEY) {
                throw new Error("sem variavel de token JWT");
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.SECRET_KEY, {
                expiresIn: "2h",
            });
            // const id = user.id;
            // const nameUser = user.name;
            // const emailUser = user.email;
            const userAuth = { "id": user.id, "name": user.name, "email": user.email };
            return res.json({
                userAuth,
                token,
            });
        });
    }
}
exports.default = AuthController;
