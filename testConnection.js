import pool from "./config/database.js";

const testConnection = async () => {
    try {
        const res = await pool.query("SELECT NOW()");
        console.log("Conexão bem-sucedida:", res.rows[0]);
        process.exit(); // Encerra o processo após o teste
    } catch (err) {
        console.error("Erro ao conectar ao banco:", err.message);
        process.exit(1); // Encerra o processo com erro
    }
};

testConnection();
