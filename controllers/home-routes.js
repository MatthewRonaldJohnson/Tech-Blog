const router = require('express').Router();
const {User, Post, Comment} = require('../models')

//homepage
router.get('/', async (req,res) => {
    //get all post data
    const postData = await Post.findAll({
        include: [{
            model: User,
            attributes: ['id', 'user_name'],
        },
        {
            model: Comment,
            include: {
                model: User,
                attributes: ['id', 'user_name'],
            }
        },]
    });
    //serialize that data
    const cleanPostData = postData.map(post => post.get());
    res.render('homepage', {cleanPostData, userId: req.session.UserId})
})

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('login', {login: true});
  });

module.exports = router;