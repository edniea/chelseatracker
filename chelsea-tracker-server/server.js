import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// Routes
import playersRoutes from "./routes/players.js";
import matchesRoutes from "./routes/matches.js";
import leaguesRoutes from "./routes/leagues.js";
import staffRoutes from "./routes/staff.js";
import stadiumsRoutes from "./routes/stadiums.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
const JSON_SERVER_URL = process.env.JSON_SERVER_URL || "http://localhost:3001";

app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/players", playersRoutes);
app.use("/api/matches", matchesRoutes);
app.use("/api/leagues", leaguesRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/stadiums", stadiumsRoutes);

// Legacy route for backward compatibility
app.use("/api/chelsea", playersRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "ok", 
    jsonServerUrl: JSON_SERVER_URL,
    endpoints: {
      players: "/api/players",
      matches: "/api/matches",
      leagues: "/api/leagues",
      staff: "/api/staff",
      stadiums: "/api/stadiums"
    }
  });
});

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Chelsea Tracker API",
    version: "1.0.0",
    endpoints: {
      health: "/api/health",
      players: "/api/players",
      matches: "/api/matches",
      leagues: "/api/leagues",
      staff: "/api/staff",
      stadiums: "/api/stadiums"
    }
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📦 JSON Server should be running on ${JSON_SERVER_URL}`);
  console.log(`📚 API Documentation available at http://localhost:${PORT}/api/health`);
});
