import express from "express";
import {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

// Listar todos os produtos
router.get("/", getProducts);

// Obter um produto por ID
router.get("/:id", getProductById);

// Adicionar um novo produto
router.post("/", addProduct);

// Atualizar um produto por ID
router.put("/:id", updateProduct);

// Deletar um produto por ID
router.delete("/:id", deleteProduct);

export default router;
