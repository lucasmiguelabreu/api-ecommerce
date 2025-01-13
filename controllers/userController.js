import pool from "../config/database.js";

// Listar todos os usuários
export const getUsers = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM users");
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obter um usuário por ID
export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Adicionar um novo usuário
export const addUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const result = await pool.query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
            [name, email, password]
        );
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Atualizar um usuário por ID
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    try {
        const result = await pool.query(
            "UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *",
            [name, email, password, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Deletar um usuário por ID
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }
        res.json({ message: "Usuário deletado com sucesso" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
