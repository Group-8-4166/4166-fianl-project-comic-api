import express from "express";
import {
  getAllUsersHandler,
  updateUserRoleHandler,
  getUserHandler,
  putUserHandler,
  deleteUserHandler,
} from "../controllers/userController.js";
import { authenticate } from "../middleware/authenticate.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";
import { validateUserUpdate } from "../middleware/userValidators.js";

const router = express.Router();

router.get("/", authenticate, authorizeRoles("ADMIN"), getAllUsersHandler);

router.patch("/:id/role", authenticate, authorizeRoles("ADMIN"), updateUserRoleHandler);

router.get("/me", authenticate, getUserHandler);
router.put("/me", authenticate, validateUserUpdate, putUserHandler);
router.delete("/me", authenticate, deleteUserHandler);

export default router;

