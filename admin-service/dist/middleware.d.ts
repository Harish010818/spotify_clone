import type { Request, Response, NextFunction } from "express";
interface IUser {
    _id: string;
    username: string;
    email: string;
    password: string;
    role: string;
    playlist: string[];
}
export interface AuthRequest extends Request {
    user?: IUser | null;
}
export declare const isAuthenticated: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export {};
//# sourceMappingURL=middleware.d.ts.map