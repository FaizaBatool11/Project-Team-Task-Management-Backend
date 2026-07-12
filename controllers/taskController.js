const { Task, Project, User } = require("../models");

const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      status,
      priority,
      due_date,
      project_id,
      assigned_to,
    } = req.body;

    if (
      !title ||
      !description ||
      !priority ||
      !due_date ||
      !project_id ||
      !assigned_to
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const project = await Project.findByPk(project_id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const user = await User.findByPk(assigned_to);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Assigned user not found",
      });
    }

    const task = await Task.create({
      title,
      description,
      status,
      priority,
      due_date,
      project_id,
      assigned_to,
    });

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      include: [
        {
          model: Project,
          as: "project",
          attributes: ["id", "title"],
        },
        {
          model: User,
          as: "assignedUser",
          attributes: ["id", "name", "email"],
        },
      ],
    });

    return res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByPk(id, {
      include: [
        {
          model: Project,
          as: "project",
        },
        {
          model: User,
          as: "assignedUser",
          attributes: ["id", "name", "email"],
        },
      ],
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // Team Member sirf apni assigned task update kar sakta hai
    if (req.user.role === "Team Member") {

      if (task.assigned_to !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: "Access denied. You can only update your assigned tasks.",
        });
      }

      // Team Member sirf task status/progress update kar sakta hai
      task.status = req.body.status || task.status;

      await task.save();

      return res.status(200).json({
        success: true,
        message: "Task progress updated successfully",
        task,
      });
    }

    // Admin aur Project Manager task ki sari fields update kar sakte hain
    await task.update(req.body);

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    await task.destroy();

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};