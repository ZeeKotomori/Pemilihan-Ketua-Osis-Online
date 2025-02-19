import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const register = async (req, res) => {
    const { nisn, email, fullName } = req.body;
    if (!nisn || !email || !fullName) return res.status(400).send("please fill the form");

    try {
    const existingUser = await prisma.student.findFirst({
        where: { OR: [{ nisn }, { email }] }
    });

    if (existingUser) {
        return res.status(400).send("You already using this email or NISN. If you don't recognize this, please contact the committee.");
    }

    const emailCode = crypto.randomInt(100000, 999999).toString();

    await prisma.student.create({
        data: { 
            nisn : nisn,
            email : email,
            fullName : fullName,
            otp : emailCode },
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
        subject: "email CODE FOR VOTING",
        text: `Your email code for voting is: ${emailCode}, make sure you don't give it to everyone, if I don't ask for this email, contact the committee`,
    });

        return res.status(200).send({ msg: "email sent to email." });
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
};

export const login = async (req, res) => {
    const { nisn, email } = req.body;
    if (!nisn || !email) return res.status(404).send("please fill the form");

    try {
        const user = await prisma.student.findFirst({
            where: { nisn, email }
        });

        if (!user) {
            return res.status(400).send("Invalid NISN or email.");
        }

        const token = jwt.sign({ email: user.email, nisn : user.nisn}, process.env.JWT_SECRET, { expiresIn: '1d' });

        return res.status(200).send({ msg: "Login successful.", token });
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
}

export const logout = (req, res) => {
    return res.status(200).send({ msg: "Logout successful." });
}
