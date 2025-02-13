import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllData = async (req, res) => {
    try {
        const data = await prisma.casis.count();
        return res.status(200).json({ count: data }); 
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" }); 
    }
}

export const getDataByTeamName = async (req, res) => {
    const { teamName } = req.body;

    if (!teamName) return res.status(400).json({ message: "teamName must be provided" });

    try {
        const data = await prisma.casis.count({
            where: { teamName }
        });

        return res.status(200).json({ count: data });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
