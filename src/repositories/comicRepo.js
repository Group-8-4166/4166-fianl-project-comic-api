import prisma from "../config/db.js";

export async function createComic(data) {
  let genreId = data.genreId;

  // if user provided genre name instead of id
  if (!genreId && data.genre) {
    const existing = await prisma.genre.findFirst({
      where: { genre: data.genre },
    });
    if (existing) {
      genreId = existing.id;
    } else {
      const newGenre = await prisma.genre.create({ data: { genre: data.genre } });
      genreId = newGenre.id;
    }
  }

  return await prisma.comic.create({
    data: {
      title: data.title,
      author: data.author,
      publisher: data.publisher,
      releaseYear: data.releaseYear,
      description: data.description,
      genreId,
    },
    include: { genre: true, ratings: true },
  });
}

export async function getAllComics() {
  const comics = await prisma.comic.findMany({
    include: { genre: true, ratings: true },
    orderBy: { createdAt: "asc" },
  });

  // Add computed average rating and clean structure
  return comics.map((comic) => ({
    id: comic.id,
    title: comic.title,
    author: comic.author,
    publisher: comic.publisher,
    releaseYear: comic.releaseYear,
    genre: comic.genre?.genre || null,
    rating:
      comic.ratings.length > 0
        ? comic.ratings.reduce((a, b) => a + b.rating, 0) / comic.ratings.length
        : null,
    description: comic.description,
  }));
}

export async function getComicById(id) {
  const comic = await prisma.comic.findUnique({
    where: { id },
    include: { genre: true, ratings: true },
  });

  if (!comic) return null;

  return {
    id: comic.id,
    title: comic.title,
    author: comic.author,
    publisher: comic.publisher,
    releaseYear: comic.releaseYear,
    genre: comic.genre?.genre || null,
    rating:
      comic.ratings.length > 0
        ? comic.ratings.reduce((a, b) => a + b.rating, 0) / comic.ratings.length
        : null,
    description: comic.description,
  };
}

export async function updateComic(id, updates) {
  // Handle genre name gracefully
  let genreId = updates.genreId;
  if (!genreId && updates.genre) {
    const existing = await prisma.genre.findFirst({ where: { genre: updates.genre } });
    if (existing) genreId = existing.id;
    else {
      const newGenre = await prisma.genre.create({ data: { genre: updates.genre } });
      genreId = newGenre.id;
    }
  }

  const updated = await prisma.comic.update({
    where: { id },
    data: {
      title: updates.title,
      author: updates.author,
      publisher: updates.publisher,
      releaseYear: updates.releaseYear,
      description: updates.description,
      genreId,
    },
    include: { genre: true, ratings: true },
  });

  return {
    id: updated.id,
    title: updated.title,
    author: updated.author,
    publisher: updated.publisher,
    releaseYear: updated.releaseYear,
    genre: updated.genre?.genre || null,
    rating:
      updated.ratings.length > 0
        ? updated.ratings.reduce((a, b) => a + b.rating, 0) / updated.ratings.length
        : null,
    description: updated.description,
  };
}

export async function deleteComic(id) {
  return await prisma.comic.delete({ where: { id } });
}

// check later
