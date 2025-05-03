import { Request, Response } from "express";
import { ExpenseCreateData } from "../@types/Expense.type";
import { ExpenseModel } from "../models/ExpenseModel";

export class ExpenseController {
  static async createExpense(req: Request, res: Response): Promise<void> {
    try {
      const expenseData: ExpenseCreateData = req.body;
        console.log(expenseData)
      const newExpense = await ExpenseModel.createExpense(expenseData);

      res.status(201).json(newExpense);
    } catch (error) {
      console.error("Erro ao cadastrar o gasto:", error);
      res.status(500).json({
        message: "Erro ao cadastrar o gasto",
        ...(process.env.NODE_ENV === "development" && { details: error }),
      });
    }
  }

  static async showExpense(req: Request, res: Response): Promise<void> {
    try {
      const expenseData = await ExpenseModel.showExpense();
    } catch (error) {
      
    }
  }

}
