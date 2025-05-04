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
exports.UserRepository = void 0;
const UserEntity_1 = require("../entities/UserEntity");
const uuid_1 = require("uuid");
class UserRepository {
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserEntity_1.User.repository.find({ select: ["id", "name", "email"] });
        });
    }
    static create(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = UserEntity_1.User.repository.create(Object.assign(Object.assign({}, userData), { id: (0, uuid_1.v4)() }));
            return yield UserEntity_1.User.repository.save(user);
        });
    }
    static update(id, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield UserEntity_1.User.repository.update(id, userData);
            return yield UserEntity_1.User.repository.findOneBy({ id });
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield UserEntity_1.User.repository.delete(id);
            return result.affected !== 0;
        });
    }
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserEntity_1.User.repository.findOneBy({ id });
        });
    }
    static findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserEntity_1.User.repository.findOneBy({ email });
        });
    }
}
exports.UserRepository = UserRepository;
