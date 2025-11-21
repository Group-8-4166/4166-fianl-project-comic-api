import {
  addRating,
  listRatings,
  getRating,
  putRating,
  removeRating,
} from "../services/ratingService.js";
import { validateId } from "../utils/validateId.js";

export async function createRatingHandler(req, res, next) {
  try {
    const userId = req.user.id;
    const { rating, description, comicId } = req.body;

    const validatedComicId = validateId(comicId);
    if (!validatedComicId) {
      const error = new Error("Invalid ID format. ID must be a positive integer.");
      error.status = 400;
      return next(error);
    }
    const newRating = await addRating(userId, { rating, description, comicId });
    res.status(201).json(newRating);
  } catch (err) {
    next(err);
  }
}

export async function listRatingsHandler(req, res, next) {
  try {
    const ratings = await listRatings();
    res.status(200).json(ratings);
  } catch (err) {
    next(err);
  }
}

export async function getRatingHandler(req, res, next) {
  const id = validateId(req.params.id);
  if (!id) {
    const error = new Error("Invalid ID format. ID must be a positive integer.");
    error.status = 400;
    return next(error);
  }
  try {
    const rating = await getRating(id);
    res.status(200).json(rating);
  } catch (err) {
    next(err);
  }
}

export async function putRatingHandler(req, res, next) {
  const id = validateId(req.params.id);
  if (!id) {
    const error = new Error("Invalid ID format. ID must be a positive integer.");
    error.status = 400;
    return next(error);
  }
  try {
    const updates = {};
    if (req.body.rating !== undefined) updates.rating = req.body.rating;
    if (req.body.description !== undefined) updates.description = req.body.description;

    const updated = await putRating(id, updates);
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
}

export async function deleteRatingHandler(req, res, next) {
  const id = validateId(req.params.id);
  if (!id) {
    const error = new Error("Invalid ID format. ID must be a positive integer.");
    error.status = 400;
    return next(error);
  }
  try {
    await removeRating(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
