import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Repository,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from "typeorm";
import { AppDataSource } from "../config/data-source";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import { Expense } from "./ExpenseEntity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  @OneToMany(() => Expense, (expense) => expense.user)
  expenses?: Expense[];

  constructor(id?: string, name?: string, email?: string, password?: string, expenses?: Expense[]) {
    if (id) this.id = id;
    if (name) this.name = name;
    if (email) this.email = email;
    if (password) this.password = password;
    if (expenses) this.expenses = expenses;
  }

  @BeforeInsert()
  private generateId() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }

  static repository: Repository<User> = AppDataSource.getRepository(User);
}
