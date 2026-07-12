const express = require("express");
const router = express.Router();

const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

const authMiddleware = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");

router.post(
    "/",
    authMiddleware,
    authorizeRoles("Admin","Project Manager"),
    createProject
);

router.get("/", authMiddleware, getProjects);

router.get("/:id", authMiddleware, getProjectById);

router.put(
    "/:id",
    authMiddleware,
    authorizeRoles("Admin","Project Manager"),
    updateProject
);

router.delete(
    "/:id",
    authMiddleware,
    authorizeRoles("Admin","Project Manager"),
    deleteProject
);

module.exports = router;