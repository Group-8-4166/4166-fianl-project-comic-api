import { signUp, logIn} from "../services/authService.js";
import { addToBlacklist } from "../config/tokenBlacklist.js";

export async function signUpHandler(req, res, next) {
  try {
    const { email, password } = req.body;
    const newUser = await signUp(email, password);
    res.status(201).json({ 
      message: `New user created with id ${newUser.id}`, 
      user: newUser 
    });
  } catch (err) {
    next(err);
  }
}

export async function logInHandler(req, res, next) {
  try {
    const { email, password } = req.body;
    const accessToken = await logIn(email, password);
    res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
}

export async function logOutHandler(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return res.status(400).json({ error: "You have not logged in or provided a token." });
    }

    addToBlacklist(token);
    return res.status(200).json({ message: "Logged out successfully. Token invalidated." });
  } catch (err) {
    next(err);
  }
}