import { ExpenseCreateData } from "../@types/Expense.type";
import { ExpenseRepository } from "../repositories/ExpenseRepository";


export class ExpenseModel {
    static async createExpense(expenseData: ExpenseCreateData) {

        console.log(expenseData)
        return await ExpenseRepository.create(expenseData);
    }

    static async showExpense(expenseData: ExpenseCreateData) {

        // console.log(expenseData)
        // return await ExpenseRepository.create(expenseData);
    }
}