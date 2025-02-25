import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

// export const voteTeam = async (req, res) => {
//     const { email, otp, teamName } = req.body;

//     if (!email || !otp || !teamName) return res.status(400).send("please input email, otp, and team name");

//     try {
//         const user = await prisma.user.findUnique({ where: { email } });

//         if (!user || user.otp !== otp) {
//             return res.status(400).send({ msg: "Invalid OTP." });
//         }

//         if (user.isVoted === true) {
//             return res.status(400).send({ msg: "OTP has been used. If you feel you have not voted, please inform the committee." });
//         }

//         await prisma.user.update({
//             where : { email },
//             data : {
//                 isVoted : true,
//             },
//         })

//         return res.status(200).send({ msg: "OTP verified successfully." });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).send("Internal Server Error");
//     }
// };

export const getAllUser = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        return res.status(200).send(users);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
};

export const createUser = async (req, res) => {
    const { email, password, fullName, kelas } = req.body;

    if (!email || !password || !fullName || !kelas) return res.status(400).send("Please provide email and otp");

    try {
        const newUser = await prisma.user.create({
            data: { email, password, fullName, kelas },
        });
        return res.status(201).send(newUser);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
};

export const getUser = async (req, res) => {
    const { email } = req.params;

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) return res.status(404).send("User not found");

        return res.status(200).send(user);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { email, fullName, password, kelas } = req.body;

    try {
        const updatedUser = await prisma.user.update({
            where: { id : id },
            data: {
                email : email,
                fullName : fullName,
                password : password,
                kelas : kelas
            }
        });

        return res.status(200).send(updatedUser);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.user.delete({ where: { id } });
        return res.status(200).send("User deleted successfully");
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
};