import { Request, Response } from "express";
import { ExpenseCreateData } from "../@types/Expense.type";
import { ExpenseModel } from "../models/ExpenseModel";

export class ExpenseController {
  static async createExpense(req: Request, res: Response): Promise<void> {
    try {
      const expenseData: ExpenseCreateData = req.body;
      console.log(expenseData);
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
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const order = (req.query.order as "ASC" | "DESC") || "ASC";

      if (isNaN(page) || page < 1) {
        res.status(400).json({ error: "Parâmetro 'page' inválido" });
      }

      if (isNaN(limit) || limit < 1 || limit > 100) {
        res.status(400).json({
          error: "O parâmetro 'limit' deve ser um número entre 1 e 100",
        });
      }

      const result = await ExpenseModel.showExpense(page, limit, order);
      res.status(200).json(result);
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: "Erro ao buscar despesas" });
    }
  }
}
