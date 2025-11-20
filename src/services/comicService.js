import {
  createComic,
  getAllComics,
  getComicById,
  updateComic,
  deleteComic,
} from "../repositories/comicRepo.js";

export async function createComicService(data) {
  return await createComic(data);
}

export async function listComics() {
  return await getAllComics();
}

export async function getComic(id) {
  const comic = await getComicById(id);
  if (!comic) {
    const err = new Error("Comic not found");
    err.status = 404;
    throw err;
  }
  return comic;
}

export async function putComic(id, updates) {
  try {
    return await updateComic(id, updates);
  } catch (e) {
    if (e.code === "P2025") {
      const err = new Error("Comic not found");
      err.status = 404;
      throw err;
    }
    throw e;
  }
}

export async function removeComic(id) {
  try {
    await deleteComic(id);
  } catch (e) {
    if (e.code === "P2025") {
      const err = new Error("Comic not found");
      err.status = 404;
      throw err;
    }
    throw e;
  }
}
