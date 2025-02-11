import dotenv from "dotenv";

/* Load environment variables */
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Server } from "socket.io";
import { setupSocket } from "./Utils/socket.js";
import connectDB from "./Config/db.js";
import {
  globalErrorHandler,
  notFoundHandler,
} from "./Middleware/ErrorHandlingMiddleware.js";
import userRoutes from "./Routes/userRoutes.js";
import eventRoutes from "./Routes/eventRoutes.js";

/* Handle uncaught error */

process.on("uncaughtException", (err) => {
  console.error(err);
  process.exit(1);
});

/* Server Initialization */
const app = express();
const port = process.env.PORT || 3000;
const httpServer = createServer(app);

/* Setup Socket.IO */

const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5173", "https://eventify-ssg.vercel.app/"], // Frontend's URL in production
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  },
});
setupSocket(io);

/* Connect to MongoDB */
connectDB();

/* Middleware */

app.use(
  cors({
    origin: ["http://localhost:5173", "https://eventify-ssg.vercel.app/"],
    credentials: true,
    methods: ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],  // Add Authorization if using tokens
  })
);
app.options("*", cors()); // Handle preflight requests for all routes

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* Routes */

app.get("/api/v1/test", (req, res, next) => {
  res.send("Server is running");
});

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/event", eventRoutes);

/*  404 and global error handling */

app.use(notFoundHandler);
app.use(globalErrorHandler);

/* Start Server */
httpServer.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

/* Handle unhandled promise rejections */
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  httpServer.close(() => {
    process.exit(1);
  });
});
