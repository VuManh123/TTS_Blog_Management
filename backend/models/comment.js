// Comment model (models/Comment.js)
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    content: DataTypes.TEXT,
    created_at: DataTypes.DATE,
    blog_id: DataTypes.INTEGER,
  });

  Comment.associate = function(models) {
    // Quan hệ giữa Comment và User
    Comment.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user' // Alias để lấy dữ liệu của User
    });
  };

  return Comment;
};
