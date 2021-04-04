const { Comment } = require('../models');

const commentData = [
  {
    body: 'Sweetflying says hi GoldenGeese.',
    user_id: 1,
    post_id: 2,
  },
  {
    body: 'GoldenGeese says hi Departures.',
    user_id: 2,
    post_id: 3,
  },
  {
    body: 'Departures says hi Sweetflying.',
    user_id: 3,
    post_id: 1,
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
