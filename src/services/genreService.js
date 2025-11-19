import {
  createGenre,
  getAllGenres,
  getGenreById,
  updateGenre,
  deleteGenre,
} from "../repositories/genreRepo.js";

export async function createGenreService(data) {
  return await createGenre(data);
}

export async function listGenres() {
  return await getAllGenres();
}

export async function getGenre(id) {
  const genre = await getGenreById(id);
  if (!genre) {
    const err = new Error("Genre not found");
    err.status = 404;
    throw err;
  }
  return genre;
}

export async function putGenre(id, updates) {
  try {
    return await updateGenre(id, updates);
  } catch (e) {
    if (e.code === "P2025") {
      const err = new Error("Genre not found");
      err.status = 404;
      throw err;
    }
    throw e;
  }
}

export async function removeGenre(id) {
  try {
    await deleteGenre(id);
  } catch (e) {
    if (e.code === "P2025") {
      const err = new Error("Genre not found");
      err.status = 404;
      throw err;
    }
    throw e;
  }
}
