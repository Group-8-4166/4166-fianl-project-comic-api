import { getRatingById } from "../repositories/ratingRepo.js";
import { getReadingEntryById } from "../repositories/readingListRepo.js";

export async function authorizeRatingOwnership(req, res, next) {
  const id = parseInt(req.params.id);
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
  const id = parseInt(req.params.id);
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
