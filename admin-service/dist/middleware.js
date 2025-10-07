import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();
// Step 2: Middleware
export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies?.token;
        if (!token) {
            res.status(401).json({ message: "Authentication required" });
            return;
        }
        const { data } = await axios.get(`${process.env.USER_SERVICE_URL}`, {
            headers: {
                token
            }
        });
        req.user = data;
        next();
    }
    catch (err) {
        console.error("JWT error:", err.message);
        res.status(500).json({ message: "Authentication failed" });
        return;
    }
};
//# sourceMappingURL=middleware.js.map