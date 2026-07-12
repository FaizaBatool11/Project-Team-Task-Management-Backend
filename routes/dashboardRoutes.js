const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");

const {
  adminDashboard,
  managerDashboard,
  memberDashboard,
} = require("../controllers/dashboardController");

router.get(
  "/admin",
  authMiddleware,
  authorizeRoles("Admin"),
  adminDashboard
);

router.get(
  "/manager",
  authMiddleware,
  authorizeRoles("Project Manager"),
  managerDashboard
);

router.get(
  "/member",
  authMiddleware,
  authorizeRoles("Team Member"),
  memberDashboard
);

module.exports = router;