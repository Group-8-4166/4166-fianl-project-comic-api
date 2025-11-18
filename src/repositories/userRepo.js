import prisma from "../config/db.js";

export async function createUser(data) {
  return await prisma.user.create({
    data,
    select: {
      id: true,
      email: true,
      role: true,
    },
  });
}

export async function findUserByEmail(email) {
  return await prisma.user.findUnique({ where: { email } });
}

export async function getAllUsers() {
  return await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      role: true,
    },
  });
}

export async function getUser(id) {
  return await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      role: true,
    },
  });
}

export async function putUser(id, updates) {
  return await prisma.user.update({
    where: { id },
    data: updates,
    select: {
      id: true,
      email: true,
      role: true,
    },
  });
}

export async function deleteUser(id) {
  return await prisma.user.delete({
    where: { id },
    select: {
      id: true,
      email: true,
    },
  });
}

export async function patchUserRole(id, role) {
  return await prisma.user.update({
    where: { id },
    data: { role },
    select: {
      id: true,
      email: true,
      role: true,
    },
  });
}


