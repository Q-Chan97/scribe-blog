import bcrypt from "bcryptjs";
import { type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../db/prisma.js";
import * as queries from "../db/queries.js";

export async function createUser(req: Request, res: Response, next: NextFunction) {
    try {

        const { username, email, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            res.status(400).json({ message: "Passwords do not match"})
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = await queries.createUser({
            username: username, 
            password: hashedPassword, 
            email: email
        });

        jwt.sign({ user: newUser }, process.env.SECRET_KEY!, { expiresIn: "3d"}, (err, token) => {
            if (err) return res.status(500).json({ message: "Token signing failed" });
            res.status(201).json({ token })
        })

    } catch (err) {
        next(err)
    }
}

export function verifyToken(req: Request, res: Response, next: NextFunction) {
   
    const bearerHeader = req.headers['authorization']; // Gets token
    
    if (!bearerHeader) {
        res.status(403).json({ message: "Forbidden" });
        return;
    }

    const bearerToken = bearerHeader.split(" ")[1] // Split at at space and extract

    if (!bearerToken) {
        res.status(403).json({ message: "Forbidden" });
        return;
    }

    try {
        const decoded = jwt.verify(bearerToken, process.env.SECRET_KEY!);
        req.user = decoded as Express.User; // Attach payload to req 
        next();
    } catch {
        res.status(401).json({ message: "Invalid or expired token"})
    }
}

export async function loginUser(req:Request, res: Response) {
    const user = await prisma.user.findUnique({
        where: {
            username: req.body.username,
        }
    })

    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }

    const passwordMatch = await bcrypt.compare(req.body.password, user.password);

    if (!passwordMatch) {
        res.status(401).json({ message: "Password is incorrect" });
        return;
    }

    jwt.sign({user: user}, process.env.SECRET_KEY!, {expiresIn: "3d"}, (err, token) => {
        if (err) {
            return res.status(500).json({ message: "Token signing failed" })
        }
        res.json({
            token: token,
        })
    })
}

export async function logoutUser(req: Request, res: Response) {
    res.status(200).json({ message: "Logged out" });
}