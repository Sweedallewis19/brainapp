import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "./config";

export const userMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(403).json({ message: "Authorization token missing" });
        return; 
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        if (typeof decoded === "string") {
            res.status(403).json({ message: "Invalid token payload" });
            return;
        }

        req.userId = (decoded as JwtPayload).id;
        next(); 
    } catch (err) {
        res.status(403).json({ message: "Invalid or expired token" });
    }
};
