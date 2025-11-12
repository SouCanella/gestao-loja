import express from "express";
import cors from "cors";
import morgan from "morgan";

import authRouter from "./routes/auth.js";
import productsRouter from "./routes/products.js";
import ordersRouter from "./routes/orders.js";
import configRouter from "./routes/config.js";
import { auth } from "./middleware/auth.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/health", (_req, res) => res.status(200).json({ ok: true }));

// público
app.use("/auth", authRouter);

// protegido
app.use("/products", auth, productsRouter);
app.use("/orders", auth, ordersRouter);
app.use("/config", auth, configRouter);

export default app;
