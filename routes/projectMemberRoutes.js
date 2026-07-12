const express = require("express");

const router = express.Router();

const {
    assignMember,
    getProjectMembers,
    getUserProjects,
    removeMember
} = require("../controllers/projectMemberController");

const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, assignMember);

router.get("/project/:projectId", authMiddleware, getProjectMembers);

router.get("/user/:id", authMiddleware, getUserProjects);

router.delete("/:id", authMiddleware, removeMember);

module.exports = router;