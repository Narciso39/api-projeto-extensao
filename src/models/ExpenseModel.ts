import { ExpenseCreateData } from "../@types/Expense.type";
import { ExpenseRepository } from "../repositories/ExpenseRepository";


export class ExpenseModel {
    static async createExpense(expenseData: ExpenseCreateData) {

        console.log(expenseData)
        return await ExpenseRepository.create(expenseData);
    }

    static async showExpense(
        page: number = 1,
        limit: number = 10,
        order: 'ASC' | 'DESC' = 'ASC'
    ) {
       
        const take = limit > 0 && limit <= 100 ? limit : 10;
        const skip = (page > 0 ? page - 1 : 0) * take;
        
     
        const [expenses, total] = await ExpenseRepository.findAndCount({
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
    }
}