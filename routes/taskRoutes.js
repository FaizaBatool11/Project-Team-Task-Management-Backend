const express = require("express");

const router = express.Router();

const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const authMiddleware = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");

router.post(
  "/",
  authMiddleware,
  authorizeRoles("Admin", "Project Manager"),
  createTask
);

router.get("/", authMiddleware, getTasks);

router.get("/:id", authMiddleware, getTaskById);

router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("Admin", "Project Manager", "Team Member"),
  updateTask
);

router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("Admin", "Project Manager"),
  deleteTask
);

module.exports = router;