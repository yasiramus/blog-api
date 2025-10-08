import { body, ValidationChain } from "express-validator";

import User from "@/models/user";

/**
 * Shared validators
 */

// Email field validator
export const emailValidator = (checkUniqueness = false): ValidationChain => {
    const chain = body("email")
        .trim()
        .notEmpty().withMessage("Email is required")
        .isLength({ max: 50 }).withMessage("Email must be at most 50 characters long")
        .isEmail().withMessage("Invalid email address");

    if (checkUniqueness) {
        chain.custom(async (value) => {
            value.toLowerCase()
            const userExists = await User.exists({ email: value });
            if (userExists) {
                throw new Error("Account is already registered");
            }
        });
    }

    return chain;
};

// Password field validator
export const passwordValidator = (isRegister = false): ValidationChain => {
    const chain = body("password")
        .notEmpty().withMessage("Password is required");

    if (isRegister) {
        chain.isLength({ min: 8 }).withMessage("Password must be at least 8 characters long")
            .matches(/[A-Z]/).withMessage("Password must contain an uppercase letter")
            .matches(/[a-z]/).withMessage("Password must contain a lowercase letter")
            .matches(/[0-9]/).withMessage("Password must contain a number")
            .matches(/[!@#$%^&*]/).withMessage("Password must contain at least one special character (!@#$%^&*)");
    }

    return chain;
};

// Role field validator (for registration)
export const roleValidator = body("role")
    .optional()
    .isString().withMessage("Role must be a string")
    .isIn(["user", "admin"]).withMessage("Role must be either user or admin");

/**
 * Route-level composed validators
 */

// Register validator
export const registerValidation = [
    emailValidator(true),
    passwordValidator(true),
    roleValidator
];

// Login validator
export const loginValidation = [
    emailValidator(false),
    passwordValidator(false)
];
