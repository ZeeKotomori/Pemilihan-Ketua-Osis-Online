import express from "express";
import { authMiddleware } from "../middleware/authenticateJwt.js";
import { createUser, deleteUser, getAllUser, getUser, updateUser } from "../controllers/userController.js";
import { checkUserRole } from "../middleware/roleUserCheckMiddleware.js";

const router = express.Router();

// router.post("/vote-team", authMiddleware, checkUserRole(['u']), voteTeam);
router.get("/get-users", authMiddleware, getAllUser);
router.get("/get-user", authMiddleware, getUser);
router.post("/create-user", authMiddleware, checkUserRole(['a']), createUser);
router.patch("/update-user", authMiddleware, checkUserRole(['a']), updateUser);
router.delete("/delete-user", authMiddleware, checkUserRole(['a']), deleteUser);

export default router;