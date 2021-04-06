const { Post } = require('../models');
const sequelize = require('../config/connection')
const checkAuth = require('../utils/checkAuth')

const router = require('express').Router();

router.get('/', checkAuth, async (req,res) => {
    //assume user_id 1 is logged in
    const rawPostData = await Post.findAll({
        where: {user_id: req.session.userId},
        order: sequelize.literal('created_at DESC')
    });
    const postData = rawPostData.map(post => post.get());
    res.render('dashboardpage', {postData, loggedIn: true})
})

router.get('/newPost', (req,res) => {
    res.render('newPost')
})

router.post('/', async (req,res) => {
    res.end(JSON.stringify(req.body))
})

module.exports = router;