import { getRatingById } from "../repositories/ratingRepo.js";
import { getReadingEntryById } from "../repositories/readingListRepo.js";
import { validateId } from "../utils/validateId.js";

export async function authorizeRatingOwnership(req, res, next) {
  const id = validateId(req.params.id);
  if (!id) {
    const error = new Error("Invalid ID format. ID must be a positive integer.");
    error.status = 400;
    return next(error);
  }
  const rating = await getRatingById(id);
  if (!rating) {
    const err = new Error("Rating not found");
    err.status = 404;
    return next(err);
  }
  if (rating.userId !== req.user.id && req.user.role !== "ADMIN") {
    const err = new Error("Forbidden: insufficient permission");
    err.status = 403;
    return next(err);
  }
  next();
}

export async function authorizeReadingEntryOwnership(req, res, next) {
  const id = validateId(req.params.id);
  if (!id) {
    const error = new Error("Invalid ID format. ID must be a positive integer.");
    error.status = 400;
    return next(error);
  }
  const entry = await getReadingEntryById(id);
  if (!entry) {
    const err = new Error("Entry not found");
    err.status = 404;
    return next(err);
  }
  if (entry.userId !== req.user.id && req.user.role !== "ADMIN") {
    const err = new Error("Forbidden: insufficient permission");
    err.status = 403;
    return next(err);
  }
  next();
}
