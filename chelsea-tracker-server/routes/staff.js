import express from "express";
import { 
  getAllStaff, 
  getStaffById, 
  createStaff, 
  updateStaff, 
  deleteStaff 
} from "../controllers/staff-controller.js";

const router = express.Router();

// Get all staff
router.get("/", getAllStaff);

// Get staff by ID
router.get("/:id", getStaffById);

// Create new staff member
router.post("/", createStaff);

// Update staff member
router.put("/:id", updateStaff);

// Delete staff member
router.delete("/:id", deleteStaff);

export default router;

