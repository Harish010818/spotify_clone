import jwt from "jsonwebtoken";
import { User } from "./model.js";
// Step 2: Middleware
export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies?.token;
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
        const userData = await User.findById(decode.userId).select("-password -__v");
        if (!userData) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        // Attach user info to request
        req.user = userData;
        next();
    }
    catch (err) {
        console.error("JWT error:", err.message);
        res.status(500).json({ message: "Authentication failed" });
        return;
    }
};
//# sourceMappingURL=middleware.js.map