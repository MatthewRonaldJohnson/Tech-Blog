const router = require('express').Router();
const { Comment, User, Post } = require('../../models')

router.get('/', async (req, res) => {
    const commentData = await Comment.findAll({
        include: [{
            model: User,
            attributes: ['id', 'user_name']
        },
        {
            model: Post,
            include: {
                model: User,
                attributes: ['id', 'user_name']
            }
        }
    ]
    });
    res.json(commentData)
})

router.get('/:id', async (req, res) => {
    const commentData = await Comment.findByPk(req.params.id, {
        include: [{
            model: User,
            attributes: ['id', 'user_name']
        },
        {
            model: Post,
            include: {
                model: User,
                attributes: ['id', 'user_name']
            }
        }
    ]
    });
    if (commentData === null) res.end('Not found')
    res.json(commentData)
})

router.post('/', async (req, res) => {
    req.body.user_id = req.session.userId;
    const newCommentData = await Comment.create(req.body)
    res.json(newCommentData)
})

router.put('/:id', async (req, res) => {
    const updatedCommentData = await Comment.update(req.body, { where: { id: req.params.id } })
    res.json(updatedCommentData)
})

router.delete('/:id', async (req, res) => {
    const deletedComment = await Comment.destroy({ where: { id: req.params.id } })
    res.json(deletedComment)
})

module.exports = router;