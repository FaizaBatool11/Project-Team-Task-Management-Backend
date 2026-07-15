const express = require("express");
const router = express.Router();

const { getRoles } = require("../controllers/roleController");

// Get All Roles
router.get("/", getRoles);

module.exports = router;