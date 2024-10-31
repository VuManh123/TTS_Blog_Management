'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BlogContent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BlogContent.init({
    blog_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    introduction: DataTypes.STRING,
    main_content: DataTypes.TEXT,
    language_id: DataTypes.INTEGER,
    root: DataTypes.BOOLEAN,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'BlogContent',
  });
  return BlogContent;
};