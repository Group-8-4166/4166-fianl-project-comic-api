import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Prisma } from "@prisma/client";
import { createUser, findUserByEmail } from "../repositories/userRepo.js";
import { isBlacklisted } from "../config/tokenBlacklist.js";
import { token } from "morgan";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

// Sign up a new user
export async function signUp(email, passwordStr) {
  try {
    // Check if user already exists
    const existing = await findUserByEmail(email);
    if (existing) {
      const err = new Error("Email already in use");
      err.status = 409;
      throw err;
    }

    // Hash the password
    const password = await bcrypt.hash(passwordStr, 10);

    // Try creating the user in DB
    const user = await createUser({ email, password });
    return user;

  } catch (error) {
    // Handle Prisma unique constraint error (duplicate email)
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      const err = new Error("Email already in use");
      err.status = 409;
      throw err;
    }
    throw error;
  }
}

// Log in a user
export async function logIn(email, password) {
  if (!email || !password) {
    const err = new Error("Incomplete credentials");
    err.status = 400;
    throw err;
  }
  const user = await findUserByEmail(email);
  if (!user) {
    const err = new Error("Invalid credentials");
    err.status = 401;
    throw err;
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const err = new Error("Invalid credentials");
    err.status = 401;
    throw err;
  }

  // Generate token
  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  return token;
}

// Log out a user
export async function logOut(userId) {
  if (token) {
    isBlacklisted(token);
  }
  return { message: "Logged out successfully" };
}
