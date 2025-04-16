"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const UserModel_1 = __importDefault(require("../models/UserModel"));
class UserController {
    static getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield UserModel_1.default.getAllUsers();
                res.json(users);
            }
            catch (error) {
                res.status(500).json({ message: "Erro ao buscar usuários" });
            }
            return; // Adiciona retorno explícito void
        });
    }
    // static async getUserById(req: Request, res: Response): Promise<void> {
    //   try {
    //     const user = await UserModel.(req.params.id);
    //     if (!user) {
    //       res.status(404).json({ message: "Usuário não encontrado" });
    //       return;
    //     }
    //     res.json(user);
    //   } catch (error) {
    //     res.status(500).json({ message: "Erro ao buscar usuário" });
    //   }
    //   return;
    // }
    static createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = req.body;
                if (!userData.email || !userData.password || !userData.name) {
                    res.status(400).json({ message: "Dados incompletos" });
                    return;
                }
                // const userExists = await UserModel.getUserByEmail(userData.email);
                // if (userExists) { 
                //   res.status(409).json({ message: "Email já cadastrado" });
                //   return;
                // }
                const newUser = yield UserModel_1.default.createUser(userData);
                const { password: _ } = newUser, userWithoutPassword = __rest(newUser, ["password"]);
                res.status(201).json(userWithoutPassword);
            }
            catch (error) {
                console.error("Erro ao criar usuário:", error);
                res.status(500).json(Object.assign({ message: "Erro ao criar usuário" }, (process.env.NODE_ENV === 'development' && { details: error })));
            }
        });
    }
    static updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield UserModel_1.default.updateUser(req.params.id, req.body);
                if (!user) {
                    res.status(404).json({ message: "Usuário não encontrado" });
                    return;
                }
                res.json(user);
            }
            catch (error) {
                res.status(400).json({ message: "Erro ao atualizar usuário" });
            }
            return;
        });
    }
    static deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const success = yield UserModel_1.default.deleteUser(req.params.id);
                if (!success) {
                    res.status(404).json({ message: "Usuário não encontrado" });
                    return;
                }
                res.status(204).send();
            }
            catch (error) {
                res.status(500).json({ message: "Erro ao deletar usuário" });
            }
            return;
        });
    }
}
exports.UserController = UserController;
