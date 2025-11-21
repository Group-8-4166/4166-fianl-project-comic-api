import {
  createGenreService,
  listGenres,
  getGenre,
  putGenre,
  removeGenre,
} from "../services/genreService.js";
import { validateId } from "../utils/validateId.js";

export async function createGenreHandler(req, res, next) {
  try {
    const data = { genre: req.body.genre };
    const genre = await createGenreService(data);
    res.status(201).json(genre);
  } catch (err) {
    next(err);
  }
}

export async function listGenresHandler(req, res, next) {
  try {
    const genres = await listGenres();
    res.status(200).json(genres);
  } catch (err) {
    next(err);
  }
}

export async function getGenreHandler(req, res, next) {
  const id = validateId(req.params.id);
  if (!id) {
    const error = new Error("Invalid ID format. ID must be a positive integer.");
    error.status = 400;
    return next(error);
  }
  try {
    const genre = await getGenre(id);
    res.status(200).json(genre);
  } catch (err) {
    next(err);
  }
}

export async function putGenreHandler(req, res, next) {
  const id = validateId(req.params.id);
  if (!id) {
    const error = new Error("Invalid ID format. ID must be a positive integer.");
    error.status = 400;
    return next(error);
  }
  try {
    const updates = {};
    if (req.body.genre) updates.genre = req.body.genre;
    const updated = await putGenre(id, updates);
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
}

export async function deleteGenreHandler(req, res, next) {
  const id = validateId(req.params.id);
  if (!id) {
    const error = new Error("Invalid ID format. ID must be a positive integer.");
    error.status = 400;
    return next(error);
  }
  try {
    await removeGenre(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
