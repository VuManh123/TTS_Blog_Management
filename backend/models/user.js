'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    avatar_url: DataTypes.STRING,
    bio: DataTypes.TEXT,
    role_id: DataTypes.INTEGER,
    created_at: {
      type: DataTypes.DATE,
      field: 'created_at', // Tên cột trong DB
    },
    updated_at: {
      type: DataTypes.DATE,
      field: 'updated_at', // Tên cột trong DB
    },
    active: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
    timestamps: false,  // Tắt timestamps nếu không sử dụng createdAt/updatedAt mặc định
  });
  return User;
};