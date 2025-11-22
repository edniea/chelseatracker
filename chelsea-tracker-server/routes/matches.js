import express from "express";
import { 
  getAllMatches, 
  getMatchById, 
  createMatch, 
  updateMatch, 
  deleteMatch 
} from "../controllers/matches-controller.js";

const router = express.Router();

// Get all matches
router.get("/", getAllMatches);

// Get match by ID
router.get("/:id", getMatchById);

// Create new match
router.post("/", createMatch);

// Update match
router.put("/:id", updateMatch);

// Delete match
router.delete("/:id", deleteMatch);

export default router;

