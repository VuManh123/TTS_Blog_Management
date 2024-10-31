'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Roles', [
      { name: 'Guest', description: 'Guest user', created_at: new Date(), updated_at: new Date() },
      { name: 'User', description: 'Regular user', created_at: new Date(), updated_at: new Date() },
      { name: 'BlogOwner', description: 'User with blog creation rights', created_at: new Date(), updated_at: new Date() },
      { name: 'SuperAdmin', description: 'Administrator with all rights', created_at: new Date(), updated_at: new Date() },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {});
  }
};
