import express from "express";
import {
    getOrders,
    getOrderById,
    addOrder,
    updateOrder,
    deleteOrder,
} from "../controllers/orderController.js";

const router = express.Router();

// Listar todos os pedidos
router.get("/", getOrders);

// Obter um pedido por ID
router.get("/:id", getOrderById);

// Adicionar um novo pedido
router.post("/", addOrder);

// Atualizar um pedido por ID
router.put("/:id", updateOrder);

// Deletar um pedido por ID
router.delete("/:id", deleteOrder);

export default router;
