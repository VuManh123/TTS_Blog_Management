'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Blogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      slug: {
        type: Sequelize.STRING
      },
      excerpt: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.ENUM('Draft', 'Published', 'Archived'),
        defaultValue: 'Draft', // thiết lập giá trị mặc định nếu cần
        allowNull: false // nếu bạn muốn cột này không được phép null
      },   
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          id: 'id'
        }
      },
      category_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories',
          id: 'id'
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Blogs');
  }
};