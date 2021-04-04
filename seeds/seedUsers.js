const { User } = require('../models');

const userData = [
  {
    user_name: 'SweetFlying',
    password: '12345678',
  },
  {
    user_name: 'GoldenGeese',
    password: 'abcdefgh',
  },
  {
    user_name: 'Departures',
    password: 'Jimbo123',
  },
];

const seedUsers = () => User.bulkCreate(userData, {individualHooks: true});

module.exports = seedUsers;
