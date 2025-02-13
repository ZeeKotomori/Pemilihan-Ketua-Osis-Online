import multer from "multer"
import path from "path"
import fs from "fs"
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ensureDirectoryExists = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        
        const uploadDir = path.join(__dirname, '..', '..', 'public', 'uploads');
        ensureDirectoryExists(uploadDir);
    
            cb(null, uploadDir);
        },

    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const filter = (req, res, cb) => {
    const allowedExtention = [".png",".jpg",".jpeg"];
    const ext = path.extname(file.originalname).toLocaleLowerCase();

    if(allowedExtention.includes(ext)) {
        cb(null, true);
    } else {
        cb(new Error("Only .png, .jpg and .jpeg format allowed!"), false);
    }
}

export const upload = multer({ storage, filter })