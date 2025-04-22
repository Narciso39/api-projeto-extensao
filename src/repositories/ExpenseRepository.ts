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
    //   static async update(id: string, userData: Partial<User>) {
    //     await User.repository.update(id, userData);
    //     return await User.repository.findOneBy({ id });
    //   }
    
    //   static async delete(id: string) {
    //     const result = await User.repository.delete(id);
    //     return result.affected !== 0;
    //   }
    
    //   static async findById(id: string) {
    //     return await User.repository.findOneBy({ id });
    //   }
    
}