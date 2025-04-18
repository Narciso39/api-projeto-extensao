import { UserCreateData } from "../@types/User.type";
import { User } from "../entities/UserEntity";
import { UserRepository } from "../repositories/UserRepository";

class UserModel {
  static async getAllUsers() {
    return await UserRepository.findAll();
  }

  static async createUser(userData: UserCreateData) { 
    if (!userData.email || !userData.password || !userData.name) {
      throw new Error("Todos os campos são obrigatórios");
    }
    return await UserRepository.create(userData);
  }
  static async updateUser(id: string, userData: Partial<User>) {
    const existingUser = await UserRepository.findById(id);
    if (!existingUser) throw new Error("Usuário não encontrado");
    
    return await UserRepository.update(id, userData);
  }

  static async deleteUser(id: string) {
    const success = await UserRepository.delete(id);
    if (!success) throw new Error("Usuário não encontrado");
    return success;
  }

  static async getUserByEmail(email: string) {
    const user = await UserRepository.findByEmail(email);
    // if (!user) throw new Error("Usuário não encontrado");
    return true;
  }
  
}

export default UserModel;
