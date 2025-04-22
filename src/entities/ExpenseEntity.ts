import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Repository,
} from "typeorm";
import { User } from "./UserEntity";
import { AppDataSource } from "../config/data-source";

@Entity("expenses")
export class Expense {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  name?: string;
  @Column()
  valueExpense?: number;
  @Column()
  description?: string;
  @Column()
  user_id?: number;
  @ManyToOne(() => User, (user) => user.expenses)
  @JoinColumn({ name: "user_id" })
  user?: User;
  @Column()
  created_at?: Date;
  @Column()
  updated_at?: Date;


   static repository: Repository<Expense> = AppDataSource.getRepository(Expense);
}
