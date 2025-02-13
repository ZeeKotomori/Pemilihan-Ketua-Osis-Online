import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const voteTeam = async (req, res) => {
    const { email, otp, teamName } = req.body;

    if (!email || !otp || !teamName) return res.status(400).send("please input email, otp, and team name");

    try {
        const student = await prisma.student.findUnique({ where: { email } });

        if (!student || student.otp !== otp) {
            return res.status(400).send({ msg: "Invalid OTP." });
        }

        if (student.isVoted === true) {
            return res.status(400).send({ msg: "OTP has been used. If you feel you have not voted, please inform the committee." });
        }

        await prisma.student.update({
            where : { email },
            data : {
                isVoted : true,
            },
        })

        return res.status(200).send({ msg: "OTP verified successfully." });
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
};