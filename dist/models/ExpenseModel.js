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
exports.ExpenseModel = void 0;
const ExpenseRepository_1 = require("../repositories/ExpenseRepository");
class ExpenseModel {
    static createExpense(expenseData) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(expenseData);
            return yield ExpenseRepository_1.ExpenseRepository.create(expenseData);
        });
    }
    static showExpense() {
        return __awaiter(this, arguments, void 0, function* (page = 1, limit = 10, order = 'ASC') {
            const take = limit > 0 && limit <= 100 ? limit : 10;
            const skip = (page > 0 ? page - 1 : 0) * take;
            const [expenses, total] = yield ExpenseRepository_1.ExpenseRepository.findAndCount({
                take,
                skip,
                order: {
                    created_at: order
                }
            });
            return {
                data: expenses,
                meta: {
                    total,
                    page,
                    last_page: Math.ceil(total / take),
                    limit: take
                }
            };
        });
    }
}
exports.ExpenseModel = ExpenseModel;
