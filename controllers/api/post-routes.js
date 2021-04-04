const router = require('express').Router();
const { Post, Comment, User } = require('../../models')

router.get('/', async (req, res) => {
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
    res.json(postData)
})

router.get('/:id', async (req, res) => {
    const postData = await Post.findByPk(req.params.id, {
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
    if (postData === null) res.end('Not found')
    res.json(postData)
})

router.post('/', async (req, res) => {
    //body should be in this format
    // {
    //   "title": "title",
    //   "body": "body",
    //   "user_id": 1
    // }
    const newPostData = await Post.create(req.body)
    res.json(newPostData)
})

router.put('/:id', async (req, res) => {
    const updatedPostData = await Post.update(req.body, { where: { id: req.params.id } })
    res.json(updatedPostData)
})

router.delete('/:id', async (req, res) => {
    const deletedPost = await Post.destroy({ where: { id: req.params.id } })
    res.json(deletedPost)
})

module.exports = router;