import {
  createComicService,
  listComics,
  getComic,
  putComic,
  removeComic,
} from "../services/comicService.js";

export async function createComicHandler(req, res, next) {
  try {
    const data = {
      title: req.body.title,
      author: req.body.author,
      publisher: req.body.publisher,
      releaseYear: parseInt(req.body.releaseYear),
      description: req.body.description,
      genre: req.body.genre,
      genreId: req.body.genreId,
    };
    const comic = await createComicService(data);
    res.status(201).json(comic);
  } catch (err) {
    next(err);
  }
}

export async function listComicsHandler(req, res, next) {
  try {
    const comics = await listComics();
    res.status(200).json(comics);
  } catch (err) {
    next(err);
  }
}

export async function getComicHandler(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const comic = await getComic(id);
    res.status(200).json(comic);
  } catch (err) {
    next(err);
  }
}

export async function putComicHandler(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const updates = {
      title: req.body.title,
      author: req.body.author,
      publisher: req.body.publisher,
      releaseYear: parseInt(req.body.releaseYear),
      description: req.body.description,
      genre: req.body.genre,
      genreId: req.body.genreId,
    };
    const updated = await putComic(id, updates);
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
}

export async function deleteComicHandler(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    await removeComic(id);
    res.status(204).json({ message: "Comic deleted" });
  } catch (err) {
    next(err);
  }
}