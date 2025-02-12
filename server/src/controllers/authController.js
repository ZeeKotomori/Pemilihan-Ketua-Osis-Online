import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

export const requestOTP = async (req, res) => {
    const { nisn, email, fullName } = req.body;
    if (!nisn || !email || !fullName) return res.status(404).send("please fill the form");

    try {
    const existingUser = await prisma.student.findFirst({
        where: { OR: [{ nisn }, { email }] }
    });

    if (existingUser) {
        return res.status(400).send("You already using this email or NISN. If you don't recognize this, please contact the committee.");
    }

    const otp = crypto.randomInt(100000, 999999).toString();

    await prisma.student.create({
        data: { nisn, email, fullName, otp },
    });

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Your OTP Code",
        text: `Your OTP code for voting is: ${otp}`,
    });

        return res.status(200).send({ msg: "OTP sent to email." });
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
};

export const verifyOTP = async (req, res) => {
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
