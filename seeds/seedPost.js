const { Post } = require('../models');

const postData = [
  {
    title: "Hi I'm SweetFlying",
    body: 'This is my first post.',
    user_id: 1
  },
  {
    title: "Hi I'm GoldenGeese",
    body: 'This is my first post.',
    user_id: 2
  },
  {
    title: "Hi I'm Departures",
    body: 'This is my first post.',
    user_id: 3
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
