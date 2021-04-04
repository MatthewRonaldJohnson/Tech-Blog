// import models
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

//User has many Post
User.hasMany(Post, {
    foreignKey: 'user_id',
});

//Post belongs to one User
Post.belongsTo(User, {
    foreignKey: 'user_id',
});

//Post has many Comments
Post.hasMany(Comment, {
    foreignKey: 'post_id',
});

//Comments belongs to one Post
Comment.belongsTo(Post, {
    foreignKey: 'post_id',
});

//User has many Comments
User.hasMany(Comment, {
    foreignKey: 'user_id',
});

//Comments belong to one User
Comment.belongsTo(User, {
    foreignKey: 'user_id',
});

module.exports = {
  User,
  Post,
  Comment,
};
