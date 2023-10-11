import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateToken = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res
            .status(401)
            .json({ message: "Authentication token is missing" });
    }

    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
        return res.status(500).json({ message: "JWT secret is not defined" });
    }

    try {
        const decodedToken = jwt.verify(token, secretKey) as { userId: string, role: string };
        req.user = { id: decodedToken.userId, name: "", email: "", role: decodedToken.role };
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid token" });
    }
};
