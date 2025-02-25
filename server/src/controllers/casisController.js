import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllData = async (req, res) => {
  try {
    const data = await prisma.casis.findMany({
      include: {
        leader: true,
        coLeader: true
      }
    });

    return res.status(200).json({ count: data.length, data });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getDataByTeamName = async (req, res) => {
  const { teamName } = req.params;

  if (!teamName) return res.status(400).json({ message: "teamName must be provided" });

  try {
    const data = await prisma.casis.findFirst({
      where: { teamName },
      include: {
        leader: true,
        coLeader: true
      }
    });

    return res.status(200).json({ data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createCasis = async (req, res) => {
  const { teamName, leaderEmail, coLeaderEmail, proker } = req.body;

  if (!teamName || !leaderEmail || !coLeaderEmail || !proker) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }

  try {
    const leader = await prisma.user.findUnique({ where: { email: leaderEmail } });
    const coLeader = await prisma.user.findUnique({ where: { email: coLeaderEmail } });

    if (!leader || !coLeader) {
      return res.status(404).json({ message: "Leader or Co-Leader not found" });
    }

    const leaderPhotoPath = req.files?.leaderPhoto ? `public/uploads/${req.files.leaderPhoto[0].filename}` : null;
    const coLeaderPhotoPath = req.files?.coLeaderPhoto ? `public/uploads/${req.files.coLeaderPhoto[0].filename}` : null;

    const newCasis = await prisma.casis.create({
      data: {
        teamName,
        leaderId: leader.id,
        coLeaderId: coLeader.id,
        leaderPhoto: leaderPhotoPath,
        coLeaderPhoto: coLeaderPhotoPath,
        proker
      },
    });

    return res.status(201).json({ message: "Casis has been created", newCasis });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateCasis = async (req, res) => {
  const { id } = req.params;
  const { teamName, leaderEmail, coLeaderEmail, proker } = req.body;

  if (!id || !teamName || !leaderEmail || !coLeaderEmail || !proker) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }

  try {
    const leader = await prisma.user.findUnique({ where: { email: leaderEmail } });
    const coLeader = await prisma.user.findUnique({ where: { email: coLeaderEmail } });

    if (!leader || !coLeader) {
      return res.status(404).json({ message: "Leader or Co-Leader not found" });
    }

    const existingCasis = await prisma.casis.findUnique({ where: { id } });
    if (!existingCasis) return res.status(404).json({ message: "Casis not found" });

    const leaderPhotoPath = req.files?.leaderPhoto
      ? `public/uploads/${req.files.leaderPhoto[0].filename}`
      : existingCasis.leaderPhoto;

    const coLeaderPhotoPath = req.files?.coLeaderPhoto
      ? `public/uploads/${req.files.coLeaderPhoto[0].filename}`
      : existingCasis.coLeaderPhoto;

    const updatedCasis = await prisma.casis.update({
      where: { id },
      data: {
        teamName,
        leaderId: leader.id,
        coLeaderId: coLeader.id,
        leaderPhoto: leaderPhotoPath,
        coLeaderPhoto: coLeaderPhotoPath,
        proker
      },
    });

    return res.status(200).json({ message: "Casis has been updated", updatedCasis });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteCasis = async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ message: "ID must be provided" });

  try {
    const casis = await prisma.casis.findUnique({ where: { id } });
    if (!casis) return res.status(404).json({ message: "Casis not found" });

    await prisma.casis.delete({ where: { id } });

    return res.status(200).json({ message: "Casis has been deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
