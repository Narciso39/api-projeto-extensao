import { Request, Response } from "express";
import { User } from "../entities/UserEntity";
// import UserModel from "src/models/UserModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

class AuthController {
  static async authenticate(req: Request, res: Response): Promise<any> {
    const { email, password } = req.body;

    // const repository = User.repository(user);
    const user = await User.repository.findOneBy({ email });

    if (!user) {
      return res.sendStatus(401);
    }

    const isValidPassowrd = await bcrypt.compare(password, user.password);

    if (!isValidPassowrd) {
      return res.sendStatus(401);
    }
    if (!process.env.SECRET_KEY) {
      throw new Error("sem variavel de token JWT");
    }
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: "2h",
    });
    // const id = user.id;
    // const nameUser = user.name;
    // const emailUser = user.email;

    const userAuth = {"id": user.id, "name": user.name, "email": user.email};
    return res.json({
      userAuth,
      token,
    });
  }
}

export default AuthController;
