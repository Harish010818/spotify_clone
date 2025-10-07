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
declare const uploadFile: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
export default uploadFile;
//# sourceMappingURL=middleware.d.ts.map