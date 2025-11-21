import bcrypt from "bcrypt";
import {
  getAllUsers,
  getUser,
  putUser,
  deleteUser,
  patchUserRole,
  findUserByEmail,
} from "../repositories/userRepo.js";

export async function findAllUsers() {
  return await getAllUsers();
}

export async function findUser(id) {
  const result = await getUser(id);
  if (result) return result;
  const error = new Error(`Cannot find user with id ${id}`);
  error.status = 404;
  throw error;
}

export async function updateUser(id, data) {
  if (!data.email && !data.password) {
    const error = new Error(`No changes`);
    error.status = 400;
    throw error;
  }
  if (data.email) {
    const result = await findUserByEmail(data.email);
    if (result && result.id !== id) {
      const error = new Error("Email in use");
      error.status = 409;
      throw error;
    }
  }
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }
  const updatedUser = await putUser(id, data);
  if (updatedUser) return updatedUser;
  const error = new Error(`Cannot find user with id ${id}`);
  error.status = 404;
  throw error;
}

export async function removeUser(id) {
  const result = await deleteUser(id);
  if (result) return;
  const error = new Error(`Cannot find user with id ${id}`);
  error.status = 404;
  throw error;
}

export async function updateUserRole(id, role) {
  if (!role || (role !== "USER" && role !== "ADMIN")) {
    const error = new Error("Invalid role");
    error.status = 400;
    throw error;
  }
  const result = await patchUserRole(id, role);
  if (result) return result;
  const error = new Error(`Cannot find user with id ${id}`);
  error.status = 404;
  throw error;
}

