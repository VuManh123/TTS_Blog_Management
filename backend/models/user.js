// models/User.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    profileImage: DataTypes.STRING,
    bio: DataTypes.TEXT,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  });

  User.associate = (models) => {
    User.hasMany(models.Blog, { foreignKey: 'user_id', as: 'blogs' });
  };

  return User;
};
