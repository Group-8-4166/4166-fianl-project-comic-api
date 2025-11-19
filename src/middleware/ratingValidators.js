import { body } from "express-validator";
import { handleValidationErrors } from "./handleValidationErrors.js";

export const validateRating = [
  body("rating")
    .exists({ checkFalsy: true })
    .withMessage("Rating required")
    .bail()
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be integer between 1 and 5"),
  body("description").optional().isString().isLength({ max: 500 }),
  body("comicId").exists({ checkFalsy: true }).withMessage("Comic ID is required")
    .bail()
    .isInt()
    .withMessage("Comic ID must be an integer"),
  handleValidationErrors,
];
