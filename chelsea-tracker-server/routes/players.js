import express from "express";
import { 
  getChelseaPlayers, 
  getPlayerById, 
  createPlayer, 
  updatePlayer, 
  deletePlayer 
} from "../controllers/players-controller.js";

const router = express.Router();

// Get all players
router.get("/players", getChelseaPlayers);

// Get player by ID
router.get("/players/:id", getPlayerById);

// Create new player
router.post("/players", createPlayer);

// Update player
router.put("/players/:id", updatePlayer);

// Delete player
router.delete("/players/:id", deletePlayer);

export default router;
