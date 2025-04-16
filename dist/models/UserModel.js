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
Object.defineProperty(exports, "__esModule", { value: true });
const UserRepository_1 = require("../repositories/UserRepository");
class UserModel {
    static getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserRepository_1.UserRepository.findAll();
        });
    }
    static createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userData.email || !userData.password || !userData.name) {
                throw new Error("Todos os campos são obrigatórios");
            }
            return yield UserRepository_1.UserRepository.create(userData);
        });
    }
    static updateUser(id, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield UserRepository_1.UserRepository.findById(id);
            if (!existingUser)
                throw new Error("Usuário não encontrado");
            return yield UserRepository_1.UserRepository.update(id, userData);
        });
    }
    static deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const success = yield UserRepository_1.UserRepository.delete(id);
            if (!success)
                throw new Error("Usuário não encontrado");
            return success;
        });
    }
    static getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserRepository_1.UserRepository.findByEmail(email);
            // if (!user) throw new Error("Usuário não encontrado");
            return true;
        });
    }
}
exports.default = UserModel;
