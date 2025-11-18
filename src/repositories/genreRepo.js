import prisma from "../config/db.js";

export async function createGenre(data) {
  return await prisma.genre.create({ data });
}

export async function getAllGenres() {
  return await prisma.genre.findMany({ include: { comics: true } });
}

export async function getGenreById(id) {
  return await prisma.genre.findUnique({ where: { id }, include: { comics: true } });
}

export async function updateGenre(id, updates) {
  return await prisma.genre.update({ where: { id }, data: updates });
}

export async function deleteGenre(id) {
  return await prisma.genre.delete({ where: { id } });
}
