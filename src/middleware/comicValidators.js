// import { body } from "express-validator";
// import { handleValidationErrors } from "./handleValidationErrors.js";

// export const validateComic = [
//   body("title").exists({ checkFalsy: true }).withMessage("Title required"),
//   body("content").exists({ checkFalsy: true }).withMessage("Content required"),
//   handleValidationErrors,
// ];

import { body } from "express-validator";
import { handleValidationErrors } from "./handleValidationErrors.js";

export const validateComic = [
  body("title").exists({ checkFalsy: true }).withMessage("Title is required"),
  body("author").exists({ checkFalsy: true }).withMessage("Author is required"),
  body("publisher").exists({ checkFalsy: true }).withMessage("Publisher is required"),
  body("releaseYear")
    .exists({ checkFalsy: true })
    .isInt({ min: 1800, max: 2100 })
    .withMessage("Release year must be valid number"),
  body("description").exists({ checkFalsy: true }).withMessage("Description is required"),
  handleValidationErrors,
];
