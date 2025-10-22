import type { Request, Response, NextFunction } from "express";
import type { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { User, type IUser } from "./model.js";


// Step 1: Extend Express Request to hold our custom user data
export interface AuthRequest extends Request {
    user?: IUser | null;
    //user?: { id: string }; 
}

// Step 2: Middleware
export const isAuthenticated = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.cookies?.token;

        console.log(token);
           
        if (!token) {
            res.status(401).json({ message: "Authentication required" });
            return; 
        }

        if (!process.env.SECRET_KEY) {
            throw new Error("SECRET_KEY not defined");
        }

        // Verify token
        const decode = jwt.verify(token, process.env.SECRET_KEY) as JwtPayload;

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

    } catch (err: any) {
        console.error("JWT error:", err.message);
        res.status(500).json({ message: "Authentication failed" });
        return
    }
};
