import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcyrpt from "bcrypt";

const prisma = new PrismaClient();

export const register = async (req, res) => {
    const { email, fullName, kelas, password, confirmPassword } = req.body;
    if (!email || !fullName || !kelas || !password || !confirmPassword) return res.status(400).send("please fill the form");

    try {

        if (password !== confirmPassword) {
            return res.status(400).send("Password and confirm password not match.");
        }

        const existingUser = await prisma.user.findFirst({
            where: { email }
        });

        if (existingUser) {
            return res.status(400).send("You already using this email or NISN. If you don't recognize this, please contact the committee.");
        }

        const hashPassword = await bcyrpt.hash(password, 12);

        await prisma.user.create({
            data: { 
                email : email,
                fullName : fullName,
                password : hashPassword,
                kelas : kelas,
            },
        });

        return res.status(200).send({ msg: user });
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    if ( !email || !password) return res.status(404).send("please fill the form");

    try {
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) return res.status(400).send("Invalid Password or email.");

        const isPasswordValid = await bcyrpt.compare(password, user.password);

        if (!isPasswordValid) return res.status(400).send("Invalid Password or email.");


        const token = jwt.sign({ email: user.email, role : user.role}, process.env.JWT_SECRET, { expiresIn: '1d' });

        return res.status(200).send({ msg: "Login successful.", token });
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
}

export const logout = (req, res) => {
    return res.status(200).send({ msg: "Logout successful." });
}