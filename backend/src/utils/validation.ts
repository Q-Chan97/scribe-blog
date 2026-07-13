import { body, validationResult } from "express-validator";
import { type Request, type Response, type NextFunction } from "express";

export const validateUser = [
    body("username").trim()
        .isLength({min: 1, max: 30})
        .withMessage("Username must be between 1 and 30 characters"),
    body("email").trim()
        .isEmail()
        .withMessage("Email is invalid. Please follow the format 'example@domain.com'"),
    body("password").trim()
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 0,
        })
        .withMessage("Password must contain at least 1 lowercase letter, uppercase letter, and number"),
    body("confirmPassword").trim()
        .exists({checkFalsy: true}).withMessage("You must confirm your password")
        .custom((value, {req}) => value === req.body.password).withMessage("Passwords do not match"),
]

export const validateSignup = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) { 
        return res.status(400).json({errors: errors.array}) 
    } else {
        return next()
    }
} 