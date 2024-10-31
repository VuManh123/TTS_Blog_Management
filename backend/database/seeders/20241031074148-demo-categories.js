'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
      {
        name: 'Technology',
        slug: 'technology',
        description: 'All about the latest in tech',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Health',
        slug: 'health',
        description: 'Health and wellness tips and news',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Lifestyle',
        slug: 'lifestyle',
        description: 'Articles on lifestyle and culture',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Education',
        slug: 'education',
        description: 'Insights and updates in the field of education',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Finance',
        slug: 'finance',
        description: 'Finance news and financial planning advice',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  },
};
