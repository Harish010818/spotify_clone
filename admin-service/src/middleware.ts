import type { Request, Response, NextFunction } from "express";
import axios from 'axios';
import dotenv from 'dotenv';
import multer from  'multer';

dotenv.config();

interface IUser {
    _id : string;
    username: string,
    email: string,
    password: string,
    role: string,
    playlist: string[]     
}

 
export interface AuthRequest extends Request {
    user?: IUser | null; 
}


export const isAuthenticated = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            res.status(401).json({ message: "Authentication required" });
            return; 
        }
     
        const {data} = await axios.get(`${process.env.USER_SERVICE_URL}`, {
             headers : {
                token
             }
        })

        req.user = data;
        next();
         
    } catch (err: any) {
        console.error("JWT error:", err.message);
        res.status(500).json({ message: "Authentication failed" });
        return
    }
};


// Multer setup for file uploads
const storage = multer.memoryStorage();
const uploadFile = multer({ storage }).single("file")
export default uploadFile;