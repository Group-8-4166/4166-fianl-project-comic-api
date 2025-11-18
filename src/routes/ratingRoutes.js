import express from "express";
import {
  createRatingHandler,
  listRatingsHandler,
  getRatingHandler,
  putRatingHandler,
  deleteRatingHandler,
} from "../controllers/ratingController.js";
import { authenticate } from "../middleware/authenticate.js";
import { authorizeRatingOwnership, authorizeReadingEntryOwnership } from "../middleware/authorizeOwnership.js";
import { validateRating } from "../middleware/ratingValidators.js";

const router = express.Router();

router.get("/", listRatingsHandler);
router.get("/:id", getRatingHandler);

// authenticated users can create ratings
router.post("/", authenticate, validateRating, createRatingHandler);

// update/delete only by owner or admin
router.put("/:id", authenticate, authorizeRatingOwnership, validateRating, putRatingHandler);
router.delete("/:id", authenticate, authorizeRatingOwnership, deleteRatingHandler);

export default router;
