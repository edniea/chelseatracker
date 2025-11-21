import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// Routes
import chelseaRoutes from "./routes/players.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
const JSON_SERVER_URL = process.env.JSON_SERVER_URL || "http://localhost:3001";

app.use(cors());
app.use(express.json());

// Use modular routes
app.use("/api/chelsea", chelseaRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", jsonServerUrl: JSON_SERVER_URL });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📦 JSON Server should be running on ${JSON_SERVER_URL}`);
});
