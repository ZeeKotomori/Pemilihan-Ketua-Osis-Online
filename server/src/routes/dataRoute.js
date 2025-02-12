import express from "express";
import { getAllData, getDataByTeamName } from "../controllers/dataController.js";

const router = express.Router();

router.get("/", getAllData);
router.get("/team", getDataByTeamName);

export default router;