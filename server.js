import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {connectDB} from "./config/db.js";
import cookieParser from "cookie-parser";
import indexRoutes from "./routes/index.routes.js";
import morgan from "morgan";

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
const corsOptions = {
  origin:'http://localhost:5173', // your frontend origin
  credentials: true, // allow cookies
};

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Connect to Database
connectDB();

// uploads folder as static
app.use("/api/uploads", express.static("uploads"));

// Routes
app.use("/api", indexRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// get the course images static to the frontend

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
