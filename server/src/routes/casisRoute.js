import express from "express";
import { createCasis, deleteCasis, getAllData, getDataByTeamName, updateCasis } from "../controllers/casisController.js";
import { upload } from "../middleware/upload.js";
import { authMiddleware } from "../middleware/authenticateJwt.js";

const router = express.Router();

router.get("/", authMiddleware, getAllData);
router.get("/team/:teamName", getDataByTeamName);

router.post(
    "/add-casis",
    upload.fields([
        { name: "leaderPhoto", maxCount: 1 },
        { name: "coLeaderPhoto", maxCount: 1 },
    ]),
    authMiddleware,
    createCasis
);

router.patch(
    "/update-casis/:id",
    upload.fields([
        { name: "leaderPhoto", maxCount: 1 },
        { name: "coLeaderPhoto", maxCount: 1 },
    ]),
    authMiddleware,
    updateCasis
);

router.delete("/delete/:id", deleteCasis)

export default router;