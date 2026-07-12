const { User, Project, Task, ProjectMember } = require("../models");

const adminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.count();

    const totalProjects = await Project.count();

    const totalTasks = await Task.count();

    const completedTasks = await Task.count({
      where: {
        status: "Completed",
      },
    });

    const pendingTasks = await Task.count({
      where: {
        status: "Pending",
      },
    });

    const inProgressTasks = await Task.count({
      where: {
        status: "In Progress",
      },
    });

    return res.status(200).json({
      success: true,
      dashboard: {
        totalUsers,
        totalProjects,
        totalTasks,
        completedTasks,
        pendingTasks,
        inProgressTasks,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const managerDashboard = async (req, res) => {
  try {
    const managerId = req.user.id;

    // Manager ke projects
    const projects = await Project.findAll({
      where: {
        manager_id: managerId,
      },
      attributes: ["id"],
    });

    const projectIds = projects.map((project) => project.id);


    // Team members count
    const totalTeamMembers = await ProjectMember.count({
      where: {
        project_id: projectIds,
      },
    });


    // Tasks count
    const totalTasks = await Task.count({
      where: {
        project_id: projectIds,
      },
    });


    const completedTasks = await Task.count({
      where: {
        project_id: projectIds,
        status: "Completed",
      },
    });


    const pendingTasks = await Task.count({
      where: {
        project_id: projectIds,
        status: "Pending",
      },
    });


    const inProgressTasks = await Task.count({
      where: {
        project_id: projectIds,
        status: "In Progress",
      },
    });


    return res.status(200).json({
      success: true,
      dashboard: {
        totalProjects: projects.length,
        totalTeamMembers,
        totalTasks,
        completedTasks,
        pendingTasks,
        inProgressTasks,
      },
    });


  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const memberDashboard = async (req, res) => {
  try {
    const memberId = req.user.id;


    // Member ke projects
    const projectMembers = await ProjectMember.findAll({
      where: {
        user_id: memberId,
      },
      attributes: ["project_id"],
    });


    const projectIds = projectMembers.map(
      (member) => member.project_id
    );


    // Total assigned tasks
    const totalTasks = await Task.count({
      where: {
        assigned_to: memberId,
      },
    });


    const completedTasks = await Task.count({
      where: {
        assigned_to: memberId,
        status: "Completed",
      },
    });


    const pendingTasks = await Task.count({
      where: {
        assigned_to: memberId,
        status: "Pending",
      },
    });


    const inProgressTasks = await Task.count({
      where: {
        assigned_to: memberId,
        status: "In Progress",
      },
    });


    return res.status(200).json({
      success: true,
      dashboard: {
        totalProjects: projectIds.length,
        totalTasks,
        completedTasks,
        pendingTasks,
        inProgressTasks,
      },
    });


  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  adminDashboard,
  managerDashboard,
  memberDashboard,
};