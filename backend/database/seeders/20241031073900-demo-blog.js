'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Blogs', [
      {
        slug: 'first-blog-post',
        excerpt: 'This is the excerpt for the first blog post.',
        status: 'published', 
        user_id: 1, 
        category_id: 1, 
      },
      {
        slug: 'second-blog-post',
        excerpt: 'This is the excerpt for the second blog post.',
        status: 'draft',  
        user_id: 2, 
        category_id: 2, 
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Blogs', null, {});
  }
};
