import express from "express";
import { 
  getAllLeagues, 
  getLeagueById, 
  createLeague, 
  updateLeague, 
  deleteLeague 
} from "../controllers/leagues-controller.js";

const router = express.Router();

// Get all leagues
router.get("/", getAllLeagues);

// Get league by ID
router.get("/:id", getLeagueById);

// Create new league
router.post("/", createLeague);

// Update league
router.put("/:id", updateLeague);

// Delete league
router.delete("/:id", deleteLeague);

export default router;

