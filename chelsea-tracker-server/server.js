import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// Routes
import chelseaRoutes from "./routes/players.js";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Use modular routes
app.use("/api/chelsea", chelseaRoutes);
app.use("/api/leagues", leaguesRoutes);
app.use("/api/players", playersRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
