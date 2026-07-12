'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Roles',
      [
        {
          name: 'Admin',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Project Manager',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Team Member',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {});
  },
};