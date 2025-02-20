import express from "express";
import { login, logout, register} from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authenticateJwt.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", authMiddleware, logout);

export default router;