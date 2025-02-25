import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoute.js";
import casisRoute from "./routes/casisRoute.js"
import userRoute from "./routes/userRoute.js"
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

app.use('/public', express.static(path.resolve(__dirname, '../public')));

app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1", casisRoute);
app.use("/api/v1/user", userRoute);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Terjadi kesalahan pada server' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
