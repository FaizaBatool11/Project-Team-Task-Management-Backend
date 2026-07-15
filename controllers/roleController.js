const { Role } = require("../models");

// Get All Roles
const getRoles = async (req, res) => {
  try {
    const roles = await Role.findAll({
      attributes: ["id", "name"],
      order: [["id", "ASC"]],
    });

    return res.status(200).json({
      success: true,
      roles,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getRoles,
};