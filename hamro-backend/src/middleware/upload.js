import multer from "multer";
import path from "path";


const storage = multer.diskStorage({
destination: (req, file, cb) => cb(null, "uploads/"),
filename: (req, file, cb) => {
cb(null, Date.now() + path.extname(file.originalname));
}
});


const fileFilter = (req, file, cb) => {
const allowed = ["image/jpeg", "image/png", "image/jpg"];
if (!allowed.includes(file.mimetype)) cb(new Error("Only JPG/PNG allowed"), false);
else cb(null, true);
};


export default multer({ storage, fileFilter });