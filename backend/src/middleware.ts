import { NextFunction,Response, Request } from "express";
import Jwt from "jsonwebtoken";
import { JWT_TOKEN } from "./config";
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization as unknown as string;
    try{
    const payload = Jwt.verify(token,JWT_TOKEN);
    //@ts-ignore
    req.id = payload.id;
    next();
    }
    catch(e){
        res.status(401).json({
            message: "You are not logged in"
        })
    }
};