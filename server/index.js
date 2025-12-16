import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

// 🔴 Crash logging (VERY IMPORTANT)
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED PROMISE REJECTION:", err);
});

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [
  "http://localhost:5173",
  "https://bereothadmin.vercel.app",
  "https://admin.bereoth.com",
  "https://www.bereoth.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (Postman, curl, mobile apps)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS: " + origin));
      }
    },
    credentials: true,
  })
);

app.use(helmet());
app.use(morgan("combined"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Routes
import authRoutes from "./routes/auth.js";
import propertyRoutes from "./routes/properties.js";
import inquiryRoutes from "./routes/inquiries.js";
import userRoutes from "./routes/users.js";
import dashboardRoutes from "./routes/dashboard.js";
import uploadRoutes from "./routes/upload.js";

// Register routes
app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/users", userRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/upload", uploadRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    message: "Server is running successfully",
    timestamp: new Date().toISOString(),
  });
});

// Error handler (must come before 404)
import { errorHandler } from "./middleware/errorHandler.js";
app.use(errorHandler);

// 404 handler (must be LAST)
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || "development"}`);
});
