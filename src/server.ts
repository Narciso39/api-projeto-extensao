import dotenv from "dotenv";
import app from "./app";
import { AppDataSource } from "./config/data-source";

dotenv.config();

async function startServer() {
  try {
    await AppDataSource.initialize();
    console.log("✅ Banco de dados conectado!");

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}.`);
    });
  } catch (error) {
    console.error("❌ Falha ao iniciar o servidor:", error);
  }
}

startServer();
