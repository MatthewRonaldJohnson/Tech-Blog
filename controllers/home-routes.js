const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models')
const checkAuth = require('../utils/checkAuth');
const prevAuth = require('../utils/prevAuth')

//homepage
router.get('/', async (req, res) => {
    //get all post data
    const postData = await Post.findAll({
        include: [{
            model: User,
            attributes: ['id', 'user_name'],
        },],
        order: sequelize.literal('post.created_at DESC'),
        limit: 10,
    });
    //serialize that data
    const cleanPostData = postData.map(post => post.get());
    for (let i = 0; i < cleanPostData.length; i++) {
        const user = JSON.parse(JSON.stringify(cleanPostData[i].user))
        cleanPostData[i].userName = user.user_name;
    }
    res.render('homepage', { cleanPostData, loggedIn: req.session.userId? true:false })
})

router.get('/login', prevAuth, (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login', { login: true });
});

router.get('/post/:id', checkAuth, async (req, res) => {
    const postData = await Post.findByPk(req.params.id, {
        include: [{
            model: User,
            attributes: ['id', 'user_name'],
        },]
    });
    //serialize post data
    const post = postData.get();
    //pulling out user name to where handlebars can grab it
    const user = JSON.parse(JSON.stringify(post.user));
    post.userName = user.user_name;


    const commentData = await Comment.findAll({
        where: { post_id: post.id },
        include: {
            model: User,
            attributes: ['id', 'user_name'],
        },
    })

    //serialize comment data
    const comments = commentData.map((comment) => comment.get())
    //pull out user names where handlebars can grab it
    for (let i = 0; i < comments.length; i++) {
        const user = comments[i].user;
        comments[i].userName = user.user_name;
    }


    res.render('postpage', { post, comments, loggedIn: req.session.userId? true:false  })
})

module.exports = router;