import pool from "../config/database.js";

// Listar todos os pedidos
export const getOrders = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM orders");
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obter um pedido por ID
export const getOrderById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM orders WHERE id = $1", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Pedido não encontrado" });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Adicionar um novo pedido
export const addOrder = async (req, res) => {
    const { user_id, product_id, quantity, total_price } = req.body;
    try {
        const result = await pool.query(
            "INSERT INTO orders (user_id, product_id, quantity, total_price) VALUES ($1, $2, $3, $4) RETURNING *",
            [user_id, product_id, quantity, total_price]
        );
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Atualizar um pedido por ID
export const updateOrder = async (req, res) => {
    const { id } = req.params;
    const { user_id, product_id, quantity, total_price } = req.body;
    try {
        const result = await pool.query(
            "UPDATE orders SET user_id = $1, product_id = $2, quantity = $3, total_price = $4 WHERE id = $5 RETURNING *",
            [user_id, product_id, quantity, total_price, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Pedido não encontrado" });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Deletar um pedido por ID
export const deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("DELETE FROM orders WHERE id = $1 RETURNING *", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Pedido não encontrado" });
        }
        res.json({ message: "Pedido deletado com sucesso" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
