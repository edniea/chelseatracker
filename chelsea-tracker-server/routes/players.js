import express from "express";
import { getChelseaPlayers } from "../controllers/players-controller.js";

const router = express.Router();

router.get("/players", getChelseaPlayers);

export default router;
