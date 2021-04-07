const { Post } = require('../models');

const postData = [
  {
    title: "Post 1",
    body: 'This is the body of the post.',
    user_id: 1
  },
  {
    title: "Post 2",
    body: 'This is the body of the post.',
    user_id: 2
  },
  {
    title: "Post 3",
    body: 'This is the body of the post.',
    user_id: 3
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
