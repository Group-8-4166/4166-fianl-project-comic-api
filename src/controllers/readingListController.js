import {
  addEntry,
  listForUser,
  removeEntry,
  getEntry,
} from "../services/readingListService.js";

export async function addToReadingListHandler(req, res, next) {
  try {
    const userId = req.user.id;
    const { comicId } = req.body;
    const entry = await addEntry(userId, comicId);
    res.status(201).json(entry);
  } catch (err) {
    next(err);
  }
}

export async function listReadingListHandler(req, res, next) {
  try {
    const userId = req.user.id;
    const list = await listForUser(userId);
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
}

export async function removeReadingEntryHandler(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    await removeEntry(id);
    res.status(204).json({ message: "Reading entry deleted" });
  } catch (err) {
    next(err);
  }
}

export async function getReadingEntryHandler(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const entry = await getEntry(id);
    res.status(200).json(entry);
  } catch (err) {
    next(err);
  }
}
