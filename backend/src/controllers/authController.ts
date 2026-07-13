import bcrypt from "bcryptjs";
import { type Request, type Response, type NextFunction } from "express";

import * as queries from "../db/queries.js";

export async function createUser(req: Request, res: Response, next: NextFunction) {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = await queries.createUser({
            username: req.body.username, 
            password: hashedPassword, 
            email: req.body.email
        });

        res.status(201).json({user: newUser})

    } catch (err) {
        next(err)
    }
}