import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: false,
  entities: ["dist/entities/*.js"],
  migrations: ["dist/config/migrations/*.js"],
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});


