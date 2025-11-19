import "dotenv/config";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // WARNING: Deletes existing data in these tables. Only run on dev/test DBs.
  await prisma.readingList.deleteMany();
  await prisma.rating.deleteMany();
  await prisma.comic.deleteMany();
  await prisma.genre.deleteMany();
  await prisma.user.deleteMany();

  // Genres
  const action = await prisma.genre.create({ data: { genre: "Action" } });
  const comedy = await prisma.genre.create({ data: { genre: "Comedy" } });
  const fantasy = await prisma.genre.create({ data: { genre: "Fantasy" } });
  const superhero = await prisma.genre.create({ data: { genre: "Superhero" } });

  // Users
  const pwUser = await bcrypt.hash("password123", 10);
  const pwAdmin = await bcrypt.hash("adminpass", 10);

  const user1 = await prisma.user.create({
    data: { email: "test@example.com", password: pwUser, role: "USER" },
  });

  const admin = await prisma.user.create({
    data: { email: "admin@example.com", password: pwAdmin, role: "ADMIN" },
  });

  // Comics (richer fields)
  const comic1 = await prisma.comic.create({
    data: {
      title: "Spider-Man: Into the Spider-Verse",
      author: "Brian Michael Bendis",
      publisher: "Marvel Comics",
      releaseYear: 2018,
      description:
        "Miles Morales becomes the Spider-Man of his reality, crossing paths with other versions of Spider-Man across the multiverse.",
      genreId: superhero.id,
    },
  });

  const comic2 = await prisma.comic.create({
    data: {
      title: "Batman: Year One",
      author: "Frank Miller",
      publisher: "DC Comics",
      releaseYear: 1987,
      description: "Bruce Wayne returns to Gotham City and becomes Batman to fight crime and corruption.",
      genreId: action.id,
    },
  });

  const comic3 = await prisma.comic.create({
    data: {
      title: "Deadpool: Merc with a Mouth",
      author: "Daniel Way",
      publisher: "Marvel Comics",
      releaseYear: 2008,
      description: "The wisecracking mercenary Deadpool takes on bizarre missions with plenty of humor and chaos.",
      genreId: comedy.id,
    },
  });

  // Ratings
  await prisma.rating.createMany({
    data: [
      {
        rating: 5,
        description: "Absolutely amazing!",
        userId: user1.id,
        comicId: comic1.id,
      },
      {
        rating: 4,
        description: "Very funny, loved it.",
        userId: admin.id,
        comicId: comic3.id,
      },
      {
        rating: 3,
        description: "Good story but could improve pacing.",
        userId: user1.id,
        comicId: comic2.id,
      },
    ],
  });

  // Reading list entries
  await prisma.readingList.create({
    data: {
      userId: user1.id,
      comicId: comic2.id,
    },
  });

  await prisma.readingList.create({
    data: {
      userId: admin.id,
      comicId: comic1.id,
    },
  });

  console.log("Seed data inserted successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
