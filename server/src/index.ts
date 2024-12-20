// IMPORTS FROM PACKAGES
import express from "express";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";
import mongoose from "mongoose";

// IMPORTS FROM OTHER FILES
import { connectDB } from "./config/db";
import { authRouter } from "./routes/auth";
import { adminRouter } from "./routes/admin";
import { productRouter } from "./routes/product";
import { userRouter } from "./routes/user";

dotenv.config();

// INIT
const PORT = process.env.PORT || 3000;
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(authRouter);
app.use(adminRouter);
app.use(productRouter);
app.use(userRouter);

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// app.listen(PORT, "0.0.0.0", () => {
//     console.log(`connected at port ${PORT}`);
//   });

connectDB(); // Connect to MongoDB
