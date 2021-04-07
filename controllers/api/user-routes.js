const router = require('express').Router();
const { User } = require('../../models')

router.get('/', async (req, res) => {
  const userData = await User.findAll({
    attributes: ['id', 'user_name']
  });
  res.json(userData)
})

router.get('/:id', async (req, res) => {
  const userData = await User.findByPk(req.params.id, {
    attributes: ['id', 'user_name']
  });
  if (userData === null) res.end('Not found')
  res.json(userData)
})

//create new user then sign them in
router.post('/', async (req, res) => {
  console.log('req.body: ',req.body)
  const newUserData = await User.create(req.body);
  console.log('newuserData: ',newUserData)
  req.session.save(() => {
    req.session.userId = newUserData.id;

    res
      .status(200)
      .json({ user:newUserData, message: 'You are now logged in!' });
  });
})

// /api/user/login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        user_name: req.body.userName,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect user or password. Please try again!' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect user or password. Please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.userId = dbUserData.id;

      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);

  }
});

// /api/user/logout
router.post('/logout', (req, res) => {
  if (req.session.userId) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.put('/:id', async (req, res) => {
  const updatedUserData = await User.update(req.body, { where: { id: req.params.id } })
  res.json(updatedUserData)
})

router.delete('/:id', async (req, res) => {
  const deletedUser = await User.destroy({ where: { id: req.params.id } })
  res.json(deletedUser)
})

module.exports = router;