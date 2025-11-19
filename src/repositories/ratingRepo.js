import prisma from "../config/db.js";

export async function createRating(data) {
  return await prisma.rating.create({ data });
}

export async function getAllRatings() {
  const ratings = await prisma.rating.findMany({
    include: {
      author: {
        select: {
          id: true,
          email: true,
          role: true,
        },
      },
      comic: {
        select: {
          id: true,
          title: true,
          author: true,
          publisher: true,
          releaseYear: true,
          description: true,
        },
      },
    },
  });
  return ratings;
}

export async function getRatingById(id) {
  const rating = await prisma.rating.findUnique({
    where: { id },
    include: {
      author: {
        select: {
          id: true,
          email: true,
          role: true,
        },
      },
      comic: {
        select: {
          id: true,
          title: true,
          author: true,
          publisher: true,
          releaseYear: true,
          description: true,
        },
      },
    },
  });
  return rating;
}


export async function updateRating(id, updates) {
  return await prisma.rating.update({ where: { id }, data: updates });
}

export async function deleteRating(id) {
  return await prisma.rating.delete({ where: { id } });
}

export async function findRatingByUserAndComic(userId, comicId) {
  return await prisma.rating.findUnique({ where: { userId_comicId: { userId, comicId } } });
}
