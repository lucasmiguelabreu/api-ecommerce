import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
    user: process.env.DB_USER,     // Usuário do banco
    host: process.env.DB_HOST,     // Host (localhost no seu caso)
    database: process.env.DB_NAME, // Nome do banco (ebook_store)
    password: process.env.DB_PASSWORD, // Senha do usuário
    port: process.env.DB_PORT,     // Porta (5432)
});

export default pool;
