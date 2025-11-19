import {
  addToReadingList,
  getReadingListForUser,
  findEntryByUserAndComic,
  deleteReadingEntry,
  getReadingEntryById,
} from "../repositories/readingListRepo.js";
import { getComicById } from "../repositories/comicRepo.js";

export async function addEntry(userId, comicId) {
  // Check if comic exists
  const comic = await getComicById(comicId);
  if (!comic) {
    const err = new Error("Comic not found");
    err.status = 404;
    throw err;
  }

  // Check if entry already exists
  const existing = await findEntryByUserAndComic(userId, comicId);
  if (existing) {
    const err = new Error("Comic already in reading list");
    err.status = 409;
    throw err;
  }

  return await addToReadingList({ userId, comicId });
}

export async function listForUser(userId) {
  return await getReadingListForUser(userId);
}

export async function removeEntry(id) {
  try {
    await deleteReadingEntry(id);
  } catch (e) {
    if (e.code === "P2025") {
      const err = new Error("Entry not found");
      err.status = 404;
      throw err;
    }
    throw e;
  }
}

export async function getEntry(id) {
  const entry = await getReadingEntryById(id);
  if (!entry) {
    const err = new Error("Entry not found");
    err.status = 404;
    throw err;
  }
  return entry;
}
