import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import { User  } from "../entities/UserEntity";
import { UserCreateData } from "../@types/User.type";

export class UserController {
  static async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await UserModel.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar usuários" });
    }
    return; // Adiciona retorno explícito void
  }

  // static async getUserById(req: Request, res: Response): Promise<void> {
  //   try {
  //     const user = await UserModel.(req.params.id);
  //     if (!user) {
  //       res.status(404).json({ message: "Usuário não encontrado" });
  //       return;
  //     }
  //     res.json(user);
  //   } catch (error) {
  //     res.status(500).json({ message: "Erro ao buscar usuário" });
  //   }
  //   return;
  // }
  static async createUser(req: Request, res: Response): Promise<void> {
    try {
      const userData: UserCreateData = req.body; 

      if (!userData.email || !userData.password || !userData.name) {
        res.status(400).json({ message: "Dados incompletos" });
        return;
      }


      // const userExists = await UserModel.getUserByEmail(userData.email);
      // if (userExists) { 
      //   res.status(409).json({ message: "Email já cadastrado" });
      //   return;
      // }

      const newUser = await UserModel.createUser(userData);
      
      const { password: _, ...userWithoutPassword } = newUser;
      res.status(201).json(userWithoutPassword);

    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      res.status(500).json({ 
        message: "Erro ao criar usuário",
        ...(process.env.NODE_ENV === 'development' && { details: error })
      });
    }
  }
  

  static async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await UserModel.updateUser(req.params.id, req.body);
      if (!user) {
        res.status(404).json({ message: "Usuário não encontrado" });
        return;
      }
      res.json(user);
    } catch (error) {
      res.status(400).json({ message: "Erro ao atualizar usuário" });
    }
    return;
  }

  static async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const success = await UserModel.deleteUser(req.params.id);
      if (!success) {
        res.status(404).json({ message: "Usuário não encontrado" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Erro ao deletar usuário" });
    }
    return;
  }
}
