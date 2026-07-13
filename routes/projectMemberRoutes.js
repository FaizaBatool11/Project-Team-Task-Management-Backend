const express = require("express");

const router = express.Router();

const {
  assignMember,
  getAllProjectMembers,
  getProjectMemberById,
  getProjectMembers,
  getUserProjects,
  updateProjectMember,
  removeMember,
} = require("../controllers/projectMemberController");

const authMiddleware = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");

// Assign Member
router.post(
  "/",
  authMiddleware,
  authorizeRoles("Admin", "Project Manager"),
  assignMember
);

// Get All Assignments
router.get(
  "/",
  authMiddleware,
  getAllProjectMembers
);

// Get Single Assignment
router.get(
  "/:id",
  authMiddleware,
  getProjectMemberById
);

// Get Members of Specific Project
router.get(
  "/project/:projectId",
  authMiddleware,
  getProjectMembers
);

// Get Projects of Specific User
router.get(
  "/user/:id",
  authMiddleware,
  getUserProjects
);

// Update Assignment
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("Admin", "Project Manager"),
  updateProjectMember
);

// Delete Assignment
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("Admin", "Project Manager"),
  removeMember
);

module.exports = router;