import express from "express";
import { 
  getAllStadiums, 
  getStadiumById, 
  createStadium, 
  updateStadium, 
  deleteStadium 
} from "../controllers/stadiums-controller.js";

const router = express.Router();

// Get all stadiums
router.get("/", getAllStadiums);

// Get stadium by ID
router.get("/:id", getStadiumById);

// Create new stadium
router.post("/", createStadium);

// Update stadium
router.put("/:id", updateStadium);

// Delete stadium
router.delete("/:id", deleteStadium);

export default router;

