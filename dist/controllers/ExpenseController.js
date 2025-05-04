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
exports.ExpenseController = void 0;
const ExpenseModel_1 = require("../models/ExpenseModel");
class ExpenseController {
    static createExpense(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const expenseData = req.body;
                console.log(expenseData);
                const newExpense = yield ExpenseModel_1.ExpenseModel.createExpense(expenseData);
                res.status(201).json(newExpense);
            }
            catch (error) {
                console.error("Erro ao cadastrar o gasto:", error);
                res.status(500).json(Object.assign({ message: "Erro ao cadastrar o gasto" }, (process.env.NODE_ENV === "development" && { details: error })));
            }
        });
    }
    static showExpense(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const page = parseInt(req.query.page) || 1;
                const limit = parseInt(req.query.limit) || 10;
                const order = req.query.order || "ASC";
                if (isNaN(page) || page < 1) {
                    res.status(400).json({ error: "Parâmetro 'page' inválido" });
                }
                if (isNaN(limit) || limit < 1 || limit > 100) {
                    res.status(400).json({
                        error: "O parâmetro 'limit' deve ser um número entre 1 e 100",
                    });
                }
                const result = yield ExpenseModel_1.ExpenseModel.showExpense(page, limit, order);
                res.status(200).json(result);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: "Erro ao buscar despesas" });
            }
        });
    }
}
exports.ExpenseController = ExpenseController;
