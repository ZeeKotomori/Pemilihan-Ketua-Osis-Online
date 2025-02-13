import express from "express";
import { createCasis, deleteCasis, getAllData, getDataByTeamName, updateCasis } from "../controllers/casisController.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.get("/", getAllData);
router.get("/team/:teamName", getDataByTeamName);

router.post(
    "/add-casis",
    upload.fields([
        { name: "leaderPhoto", maxCount: 1 },
        { name: "coLeaderPhoto", maxCount: 1 },
    ]),
    createCasis
);

router.patch(
    "/update-casis",
    upload.fields([
        { name: "leaderPhoto", maxCount: 1 },
        { name: "coLeaderPhoto", maxCount: 1 },
    ]),
    updateCasis
);

router.delete("/delete", deleteCasis)

export default router;