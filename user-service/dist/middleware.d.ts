import type { Request, Response, NextFunction } from "express";
import { type IUser } from "./model.js";
export interface AuthRequest extends Request {
    user?: IUser | null;
}
export declare const isAuthenticated: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=middleware.d.ts.map