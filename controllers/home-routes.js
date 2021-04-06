const router = require('express').Router();
const { User, Post, Comment } = require('../models')

//homepage
router.get('/', async (req, res) => {
    //get all post data
    const postData = await Post.findAll({
        include: [{
            model: User,
            attributes: ['id', 'user_name'],
        },]
    });
    //serialize that data
    const cleanPostData = postData.map(post => post.get());
    res.render('homepage', { cleanPostData, loggedIn: req.session.userId? true:false })
})

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login', { login: true });
});

router.get('/post/:id', async (req, res) => {
    //check if user is logged in, if not redirect to login page
    const postData = await Post.findByPk(req.params.id, {
        include: [{
            model: User,
            attributes: ['id', 'user_name'],
        },]
    });
    //serialize post data
    const post = postData.get();
    
    const user = JSON.parse(JSON.stringify(post.user));
    post.userName = user.user_name;
    console.log(post)


    const commentData = await Comment.findAll({
        where: { post_id: post.id },
        include: {
            model: User,
            attributes: ['id', 'user_name'],
        },
    })

    const comments = commentData.map((comment) => comment.get())
    console.log(comments)


    res.render('postpage', { post, comments })
})

module.exports = router;