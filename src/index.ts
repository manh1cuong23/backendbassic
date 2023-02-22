require("dotenv").config();

import express from "express";
import cors from "cors";
// import cookieParser from 'cookie-parser';
import { json } from "body-parser";
import mongoose from "mongoose";
import { connectDB } from "./config/db";
import { authRouter } from "./routes/Auth";
import { productRouter } from "./routes/Product";
import { cartRouter } from "./routes/Cart";
const app = express();
const PORT = process.env.PORT || 5000;

//connect to db
connectDB();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
