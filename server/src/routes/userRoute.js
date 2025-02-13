import express from "express";
import { authMiddleware } from "../middleware/authenticateJwt.js";
import { voteTeam } from "../controllers/userController.js";
import { checkUserRole } from "../middleware/roleUserCheckMiddleware.js";

const router = express.Router();

router.post("/vote-team", authMiddleware, checkUserRole(['u']), voteTeam);

export default router;