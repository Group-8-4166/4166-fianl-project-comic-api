import {
  createRating,
  getAllRatings,
  getRatingById,
  updateRating,
  deleteRating,
  findRatingByUserAndComic,
} from "../repositories/ratingRepo.js";
import { getComicById } from "../repositories/comicRepo.js";

export async function addRating(userId, { rating, description, comicId }) {
  // Validate comic exists
  const comic = await getComicById(comicId);
  if (!comic) {
    const err = new Error("Comic not found");
    err.status = 404;
    throw err;
  }

  // Ensure user hasn’t already rated this comic
  const existing = await findRatingByUserAndComic(userId, comicId);
  if (existing) {
    const err = new Error("You have already rated this comic");
    err.status = 409;
    throw err;
  }

  // Proceed to create rating
  return await createRating({
    rating,
    description,
    userId,
    comicId,
  });
}

export async function listRatings() {
  return await getAllRatings();
}

export async function getRating(id) {
  const r = await getRatingById(id);
  if (!r) {
    const err = new Error("Rating not found");
    err.status = 404;
    throw err;
  }
  return r;
}

export async function putRating(id, data) {
  try {
    return await updateRating(id, data);
  } catch (e) {
    if (e.code === "P2025") {
      const err = new Error("Rating not found");
      err.status = 404;
      throw err;
    }
    throw e;
  }
}

export async function removeRating(id) {
  try {
    await deleteRating(id);
  } catch (e) {
    if (e.code === "P2025") {
      const err = new Error("Rating not found");
      err.status = 404;
      throw err;
    }
    throw e;
  }
}
