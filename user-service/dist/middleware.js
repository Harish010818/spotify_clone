import jwt from "jsonwebtoken";
import { User } from "./model.js";
// Step 2: Middleware
export const isAuthenticated = async (req, res, next) => {
    try {
        let token;
        // 1️⃣ First, try header-based token (for microservice-to-microservice)
        if (req.headers.token) {
            token = req.headers.token;
        }
        // 2️⃣ If not found, fallback to cookies (for frontend)
        else if (req.cookies?.token) {
            token = req.cookies.token;
        }
        if (!token) {
            res.status(401).json({ message: "Authentication required" });
            return;
        }
        if (!process.env.SECRET_KEY) {
            throw new Error("SECRET_KEY not defined");
        }
        // Verify token
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        if (!decode || !decode.userId) {
            res.status(401).json({ message: "Invalid token" });
            return;
        }
        const user = await User.findById(decode.userId).select("-password");
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        // Attach user info to request
        req.user = user;
        next();
    }
    catch (err) {
        console.error("JWT error:", err.message);
        res.status(500).json({ message: "Authentication failed" });
        return;
    }
};
//# sourceMappingURL=middleware.js.map