const router = require('express').Router();
const { Post, Comment, User } = require('../../models')
const checkAuth = require('../../utils/checkAuth')

router.post('/', checkAuth, async (req, res) => {
    req.body.user_id = req.session.userId;
    const newPostData = await Post.create(req.body)
    res.json(newPostData.id)
})

router.delete('/:id', checkAuth, async (req, res) => {
    const deletedPost = await Post.destroy({ where: { id: req.params.id } })
    res.json(deletedPost)
})

//add put route?

module.exports = router;