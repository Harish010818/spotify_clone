import axios from 'axios';
import dotenv from 'dotenv';
import multer from 'multer';
dotenv.config();
export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies?.token;
        if (!token) {
            res.status(401).json({ message: "Authentication required" });
            return;
        }
        const { data } = await axios.get(`${process.env.USER_SERVICE_URL}/api/v1/user/me`, {
            headers: {
                token
            }
        });
        req.user = data.user;
        next();
    }
    catch (err) {
        console.error("JWT error:", err.message);
        res.status(500).json({ message: "Authentication failed" });
        return;
    }
};
// Multer setup for file uploads
const storage = multer.memoryStorage();
const uploadFile = multer({ storage }).single("file");
export default uploadFile;
//# sourceMappingURL=middleware.js.map