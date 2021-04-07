const router = require('express').Router();
const { Comment, User, Post } = require('../../models')
const checkAuth = require('../../utils/checkAuth')

router.post('/', checkAuth, async (req, res) => {
    req.body.user_id = req.session.userId;
    const newCommentData = await Comment.create(req.body)
    res.json(newCommentData)
})

//add put and delete routes?

module.exports = router;