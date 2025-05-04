import { FindManyOptions } from "typeorm";
import { ExpenseCreateData } from "../@types/Expense.type";
import { Expense } from "../entities/ExpenseEntity";
import { User } from "../entities/UserEntity";
export class ExpenseRepository {
    static async findAll() {
        return await Expense.repository.find({ relations: ["user_id"] });
      }
    
      static async create(expenseData: ExpenseCreateData) {
        const user = await User.repository.findOneBy({ id: expenseData.user_id });
        if (!user) {
          throw new Error("Usuário não encontrado");
        }
        
        const expense = Expense.repository.create({
          name: expenseData.name,
          valueExpense: expenseData.valueExpense,
          description: expenseData.description,
          user: user, 
        });

        console.log(expense)
    
        return await Expense.repository.save(expense);
      }


      static async findAndCount(options?: FindManyOptions<Expense>) {
        return await Expense.repository.findAndCount({ 
            relations: ["user_id"],
            ...options 
        });
    }
   
}