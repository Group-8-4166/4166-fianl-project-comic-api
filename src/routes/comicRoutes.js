import express from "express";
import {
  createComicHandler,
  listComicsHandler,
  getComicHandler,
  putComicHandler,
  deleteComicHandler,
} from "../controllers/comicController.js";
import { authenticate } from "../middleware/authenticate.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";
import { validateComic } from "../middleware/comicValidators.js";

const router = express.Router();

router.get("/", listComicsHandler);
router.get("/:id", getComicHandler);

// protected: admin only for create/update/delete
router.post("/", authenticate, authorizeRoles("ADMIN"), validateComic, createComicHandler);
router.put("/:id", authenticate, authorizeRoles("ADMIN"), validateComic, putComicHandler);
router.delete("/:id", authenticate, authorizeRoles("ADMIN"), deleteComicHandler);

export default router;
