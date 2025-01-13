import express from "express";
import {
    getUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

// Listar todos os usuários
router.get("/", getUsers);

// Obter um usuário por ID
router.get("/:id", getUserById);

// Adicionar um novo usuário
router.post("/", addUser);

// Atualizar um usuário por ID
router.put("/:id", updateUser);

// Deletar um usuário por ID
router.delete("/:id", deleteUser);

export default router;
