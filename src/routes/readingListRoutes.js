import express from "express";
import {
  addToReadingListHandler,
  listReadingListHandler,
  removeReadingEntryHandler,
  getReadingEntryHandler,
} from "../controllers/readingListController.js";
import { authenticate } from "../middleware/authenticate.js";
import { authorizeReadingEntryOwnership } from "../middleware/authorizeOwnership.js";

const router = express.Router();

// get the authenticated user's reading list
router.get("/", authenticate, listReadingListHandler);
router.get("/:id", authenticate, authorizeReadingEntryOwnership, getReadingEntryHandler);

// add and delete (owner only for delete)
router.post("/", authenticate, addToReadingListHandler);
router.delete("/:id", authenticate, authorizeReadingEntryOwnership, removeReadingEntryHandler);

export default router;
