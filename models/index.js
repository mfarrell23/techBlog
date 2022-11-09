const User = require('./User');
const Blog = require('./Blog');
const Comment= require('./comment');
// user and blog table relationship 
User.hasMany(Blog, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Blog.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(User, {
foreignKey: 'user_id'
});

Blog.hasMany(Comment,{
  foreignKey: 'blog_id',
  onDelete: 'CASCADE'
});

module.exports = { User, Blog, Comment};