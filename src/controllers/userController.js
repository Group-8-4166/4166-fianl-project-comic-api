import {
  findAllUsers,
  findUser,
  updateUser,
  removeUser,
  updateUserRole,
} from "../services/userService.js";

export async function getAllUsersHandler(req, res, next) {
  try {
    const users = await findAllUsers();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}

export async function getUserHandler(req, res, next) {
  try {
    const id = parseInt(req.user.id);
    const user = await findUser(id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}

export async function putUserHandler(req, res, next) {
  try {
    const id = parseInt(req.user.id);
    const updates = {};
    if (req.body.email) updates.email = req.body.email;
    if (req.body.password) updates.password = req.body.password;
    const updatedUser = await updateUser(id, updates);
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
}

export async function deleteUserHandler(req, res, next) {
  try {
    const id = parseInt(req.user.id);
    await removeUser(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

export async function updateUserRoleHandler(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const { role } = req.body;
    const updatedUser = await updateUserRole(id, role);
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
}

