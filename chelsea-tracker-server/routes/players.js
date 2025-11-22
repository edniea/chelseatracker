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
router.get("/", getChelseaPlayers);
router.get("/players", getChelseaPlayers); // Legacy route

// Get player by ID
router.get("/:id", getPlayerById);
router.get("/players/:id", getPlayerById); // Legacy route

// Create new player
router.post("/", createPlayer);
router.post("/players", createPlayer); // Legacy route

// Update player
router.put("/:id", updatePlayer);
router.put("/players/:id", updatePlayer); // Legacy route

// Delete player
router.delete("/:id", deletePlayer);
router.delete("/players/:id", deletePlayer); // Legacy route

export default router;
