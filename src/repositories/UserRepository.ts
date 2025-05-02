import { UserCreateData } from "../@types/User.type";
import { User } from "../entities/UserEntity";
import { v4 as uuidv4 } from "uuid";
export class UserRepository {
  static async findAll() {
    return await User.repository.find({ select: ["id", "name", "email"] });
  }

  static async create(userData: UserCreateData) {
    const user = User.repository.create({
      ...userData,
      id: uuidv4(),
    });
    return await User.repository.save(user);
  }
  static async update(id: string, userData: Partial<User>) {
    await User.repository.update(id, userData);
    return await User.repository.findOneBy({ id });
  }

  static async delete(id: string) {
    const result = await User.repository.delete(id);
    return result.affected !== 0;
  }

  static async findById(id: string) {
    return await User.repository.findOneBy({ id });
  }

  static async findByEmail(email: string) {
    return await User.repository.findOneBy({ email });
  }
}
