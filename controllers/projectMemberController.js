const { ProjectMember, Project, User } = require("../models");

// Assign User to Project
const assignMember = async (req, res) => {
    try {

        const { project_id, user_id } = req.body;

        if (!project_id || !user_id) {
            return res.status(400).json({
                success: false,
                message: "Project ID and User ID are required"
            });
        }

        const project = await Project.findByPk(project_id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const alreadyAssigned = await ProjectMember.findOne({
            where: {
                project_id,
                user_id
            }
        });

        if (alreadyAssigned) {
            return res.status(409).json({
                success: false,
                message: "User already assigned to this project"
            });
        }

        const member = await ProjectMember.create({
            project_id,
            user_id
        });

        return res.status(201).json({
            success: true,
            message: "Member assigned successfully",
            member
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Get All Members of a Project
const getProjectMembers = async (req, res) => {
    try {

        const { projectId } = req.params;

        const members = await ProjectMember.findAll({
            where: {
                project_id: projectId
            },
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: ["id", "name", "email"]
                }
            ]
        });

        return res.status(200).json({
            success: true,
            members
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Get All Projects of a User
const getUserProjects = async (req, res) => {
    try {

        const { id } = req.params;

        const projects = await ProjectMember.findAll({
            where: {
                user_id: id
            },
            include: [
                {
                    model: Project,
                    as: "project"
                }
            ]
        });

        return res.status(200).json({
            success: true,
            projects
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Remove Member from Project
const removeMember = async (req, res) => {
    try {

        const { id } = req.params;

        const member = await ProjectMember.findByPk(id);

        if (!member) {
            return res.status(404).json({
                success: false,
                message: "Assignment not found"
            });
        }

        await member.destroy();

        return res.status(200).json({
            success: true,
            message: "Member removed successfully"
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    assignMember,
    getProjectMembers,
    getUserProjects,
    removeMember
};