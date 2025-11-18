import express from "express";
import {
  createGenreHandler,
  listGenresHandler,
  getGenreHandler,
  putGenreHandler,
  deleteGenreHandler,
} from "../controllers/genreController.js";
import { authenticate } from "../middleware/authenticate.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";

const router = express.Router();

router.get("/", listGenresHandler);
router.get("/:id", getGenreHandler);

// admin only
router.post("/", authenticate, authorizeRoles("ADMIN"), createGenreHandler);
router.put("/:id", authenticate, authorizeRoles("ADMIN"), putGenreHandler);
router.delete("/:id", authenticate, authorizeRoles("ADMIN"), deleteGenreHandler);

export default router;
