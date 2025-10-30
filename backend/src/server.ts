import express from "express";
import cors from "cors";
import morgan from "morgan";

import productsRoutes from "./routes/products.js";
import configRoutes from "./routes/config.js";
import ordersRoutes from "./routes/orders.js";
import authRoutes from "./routes/auth.js";
import { errorHandler } from "./middleware/error.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/products", productsRoutes);
app.use("/config", configRoutes);
app.use("/orders", ordersRoutes);
app.use("/auth", authRoutes);

// middleware final de erro
app.use(errorHandler);

const PORT = Number(process.env.PORT ?? 3001);
app.listen(PORT, () => {
  console.log(`API listening on :${PORT}`);
});
