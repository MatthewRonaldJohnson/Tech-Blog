const { Post, User } = require('../models');
const sequelize = require('../config/connection')
const checkAuth = require('../utils/checkAuth')

const router = require('express').Router();

router.get('/', checkAuth, async (req,res) => {
    const rawPostData = await Post.findAll({
        where: {user_id: req.session.userId},
        order: sequelize.literal('post.created_at DESC')
    });
    const postData = rawPostData.map(post => post.get());
    const rawUserData = await User.findByPk(req.session.userId);
    const userData = rawUserData.get();
    for (let i = 0; i < postData.length; i++) {
        postData[i].userName = userData.user_name;
    }
    res.render('dashboardpage', {postData, loggedIn: req.session.userId? true:false})
})

router.get('/newPost', checkAuth, (req,res) => {
    res.render('newPost')
})


module.exports = router;