import prisma from "../config/db.js";

export async function addToReadingList(data) {
  return await prisma.readingList.create({ data });
}

export async function getReadingListForUser(userId) {
  return await prisma.readingList.findMany({
    where: { userId },
    include: { comic: true },
    orderBy: { createdAt: "asc" },
  });
}

export async function getReadingEntryById(id) {
  return await prisma.readingList.findUnique({ where: { id } });
}

export async function findEntryByUserAndComic(userId, comicId) {
  return await prisma.readingList.findUnique({
    where: { userId_comicId: { userId, comicId } },
  });
}

export async function deleteReadingEntry(id) {
  return await prisma.readingList.delete({ where: { id } });
}
