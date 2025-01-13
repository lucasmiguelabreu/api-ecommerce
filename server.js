import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import productRoutes from "./routes/products.js";
import userRoutes from "./routes/users.js";
import orderRoutes from "./routes/orders.js";

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Rotas
app.use("/product", productRoutes);
app.use("/user", userRoutes);
app.use("/order", orderRoutes);

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
