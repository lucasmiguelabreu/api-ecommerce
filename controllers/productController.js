import pool from '../config/database.js';

// Listar todos os produtos
export const getProducts = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obter um produto por ID
export const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Produto não encontrado.' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Adicionar um produto
export const addProduct = async (req, res) => {
    const { title, author, description, price, type, ebook_link, affiliate_link } = req.body;

    // Validações obrigatórias
    if (!title || !price || !type) {
        return res.status(400).json({ error: 'Título, preço e tipo são obrigatórios.' });
    }

    if (type === 'ebook' && (!ebook_link || !author)) {
        return res.status(400).json({ error: 'Autor e link do e-book são obrigatórios.' });
    }

    if (type === 'affiliate' && !affiliate_link) {
        return res.status(400).json({ error: 'O link de afiliação é obrigatório.' });
    }

    try {
        const resolvedAuthor = type === 'affiliate' ? null : author;
        const result = await pool.query(
            `INSERT INTO products (title, author, description, price, type, ebook_link, affiliate_link)
             VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [title, resolvedAuthor, description || null, price, type, ebook_link || null, affiliate_link || null]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Atualizar um produto
export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { title, author, description, price, type, ebook_link, affiliate_link } = req.body;

    try {
        const existingProduct = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
        if (existingProduct.rows.length === 0) {
            return res.status(404).json({ error: 'Produto não encontrado.' });
        }

        if (type === 'ebook' && (!ebook_link || !author)) {
            return res.status(400).json({ error: 'Autor e link do e-book são obrigatórios.' });
        }

        if (type === 'affiliate') {
            author = null; // Força o author a ser null para produtos afiliados
        }

        const result = await pool.query(
            `UPDATE products
             SET title = $1, author = $2, description = $3, price = $4, type = $5, ebook_link = $6, affiliate_link = $7
             WHERE id = $8 RETURNING *`,
            [
                title || existingProduct.rows[0].title,
                author || existingProduct.rows[0].author,
                description || existingProduct.rows[0].description,
                price || existingProduct.rows[0].price,
                type || existingProduct.rows[0].type,
                ebook_link || existingProduct.rows[0].ebook_link,
                affiliate_link || existingProduct.rows[0].affiliate_link,
                id,
            ]
        );
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Deletar um produto
export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Produto não encontrado.' });
        }
        res.status(200).json({ message: 'Produto deletado com sucesso.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};