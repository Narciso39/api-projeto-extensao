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
exports.ExpenseRepository = void 0;
const ExpenseEntity_1 = require("../entities/ExpenseEntity");
const UserEntity_1 = require("../entities/UserEntity");
class ExpenseRepository {
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ExpenseEntity_1.Expense.repository.find({ relations: ["user_id"] });
        });
    }
    static create(expenseData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserEntity_1.User.repository.findOneBy({ id: expenseData.user_id });
            if (!user) {
                throw new Error("Usuário não encontrado");
            }
            const expense = ExpenseEntity_1.Expense.repository.create({
                name: expenseData.name,
                valueExpense: expenseData.valueExpense,
                description: expenseData.description,
                user: user,
            });
            console.log(expense);
            return yield ExpenseEntity_1.Expense.repository.save(expense);
        });
    }
    static findAndCount(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ExpenseEntity_1.Expense.repository.findAndCount(Object.assign({ relations: ["user"] }, options));
        });
    }
}
exports.ExpenseRepository = ExpenseRepository;
