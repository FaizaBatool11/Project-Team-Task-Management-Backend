const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");

const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

// Get All Users
router.get(
  "/",
  authMiddleware,
  authorizeRoles("Admin"),
  getUsers
);

// Get User By ID
router.get(
  "/:id",
  authMiddleware,
  authorizeRoles("Admin"),
  getUserById
);

// Update User
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("Admin"),
  updateUser
);

// Delete User
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("Admin"),
  deleteUser
);

module.exports = router;