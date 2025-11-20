import { handleValidationErrors } from "./handleValidationErrors.js";
import { body } from "express-validator";

export const validateUser = [
  body("email")
    .exists({ checkFalsy: true })
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Email is not valid")
    .normalizeEmail(),

  body("password")
    .exists({ checkFalsy: true })
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 8, max: 64 })
    .withMessage("Password must contain between 8 and 64 characters"),

  handleValidationErrors,
];

export const validateUserUpdate = [
  body("email")
    .optional()
    .isEmail()
    .withMessage("Email is not valid")
    .normalizeEmail(),

  body("password")
    .optional()
    .isLength({ min: 8, max: 64 })
    .withMessage("Password must contain between 8 and 64 characters"),

  handleValidationErrors,
];
