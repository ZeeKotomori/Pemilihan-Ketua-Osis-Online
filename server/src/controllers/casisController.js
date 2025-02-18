import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllData = async (req, res) => {
    try {
        const data = await prisma.casis.findMany();
        return res.status(200).json({ count: data.length, data }); 
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" }); 
    }
}

export const getDataByTeamName = async (req, res) => {
    const { teamName } = req.params;

    if (!teamName) return res.status(400).json({ message: "teamName must be provided" });

    try {
        const data = await prisma.casis.findFirst({
            where: { teamName : teamName}
        });

        return res.status(200).json({ data });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const createCasis = async (req, res) => {
    const { teamName, leader, coLeader, proker } = req.body

    if (!teamName || !leader || !coLeader || !proker) return res.status(400).send("please fill all form")
    try {
        const leaderPhotoPath = req.files['leaderPhoto'] ? `public/uploads/${req.files['leaderPhoto'][0].filename}` : null;
        const coLeaderPhotoPath = req.files['coLeaderPhoto'] ? `public/uploads/${req.files['coLeaderPhoto'][0].filename}` : null;

        const newCasis = await prisma.casis.create({
            data: {
                teamName,
                leader,
                coLeader,
                leaderPhoto: leaderPhotoPath,
                coLeaderPhoto: coLeaderPhotoPath,
                proker : proker
            },
        });

        return res.status(201).send({ msg : "Casis Has Been Created", newCasis });
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
}

export const updateCasis = async (req, res) => {
    const { id } = req.params;
    const { teamName, leader, coLeader } = req.body;

    if (!id || !teamName || !leader || !coLeader || !proker) return res.status(400).send("please fill all form");

    try {
        const leaderPhotoPath = req.files['leaderPhoto'] ? `public/uploads/${req.files['leaderPhoto'][0].filename}` : null;
        const coLeaderPhotoPath = req.files['coLeaderPhoto'] ? `public/uploads/${req.files['coLeaderPhoto'][0].filename}` : null;

        const updatedCasis = await prisma.casis.update({
            where: { id: parseInt(id) },
            data: {
                teamName,
                leader,
                coLeader,
                leaderPhoto: leaderPhotoPath,
                coLeaderPhoto: coLeaderPhotoPath,
                proker : proker
            },
        });

        return res.status(200).send({ msg: "Casis Has Been Updated", updatedCasis });
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
}

export const deleteCasis = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).send("id must be provided");

    try {
        await prisma.casis.delete({
            where: { id: parseInt(id) },
        });

        return res.status(200).send({ msg: "Casis Has Been Deleted" });
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
}