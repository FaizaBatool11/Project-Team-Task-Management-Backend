const { User, Role } = require("../models");

// Get All Users
const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Role,
          as: "role",
          attributes: ["id", "name"],
        },
      ],
      attributes: {
        exclude: ["password"],
      },
    });

    return res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single User
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id, {
      include: [
        {
          model: Role,
          as: "role",
          attributes: ["id", "name"],
        },
      ],
      attributes: {
        exclude: ["password"],
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update User
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, email, role_id } = req.body;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Email duplicate check
    if (email && email !== user.email) {
      const existingUser = await User.findOne({
        where: { email },
      });

      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: "Email already exists",
        });
      }
    }

    // Role validation
    if (role_id) {
      const role = await Role.findByPk(role_id);

      if (!role) {
        return res.status(404).json({
          success: false,
          message: "Role not found",
        });
      }
    }

    await user.update({
      name,
      email,
      role_id,
    });

    const updatedUser = await User.findByPk(id, {
      include: [
        {
          model: Role,
          as: "role",
          attributes: ["id", "name"],
        },
      ],
      attributes: {
        exclude: ["password"],
      },
    });

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.id === req.user.id) {
        return res.status(400).json({
            success: false,
            message: "You cannot delete your own account",
        });
    }
    await user.destroy();

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};