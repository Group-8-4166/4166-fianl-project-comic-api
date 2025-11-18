import express from "express";
import { signUpHandler, logInHandler, logOutHandler  } from "../controllers/authController.js";
import { validateUser } from "../middleware/userValidators.js";
import LogInLimiter from "../middleware/rateLimiter.js";
import { logOut } from "../services/authService.js";

const router = express.Router();

router.post("/signup", validateUser, signUpHandler);
router.post("/login", LogInLimiter, validateUser, logInHandler);
router.post("/logout", logOutHandler);

export default router;
