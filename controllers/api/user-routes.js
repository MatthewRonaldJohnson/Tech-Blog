const router = require('express').Router();
const {User} = require('../../models')

router.get('/', async (req,res) => {
    const userData = await User.findAll({
        attributes: ['id','user_name']
    });
    res.json(userData)
})

router.get('/:id', async (req,res) => {
    const userData = await User.findByPk(req.params.id,{
        attributes: ['id','user_name']
    });
    if (userData === null) res.end('Not found')
    res.json(userData)
})

router.post('/', async (req,res) => {
    const newUserData = await User.create(req.body)
    res.json(newUserData)
})

router.put('/:id', async (req,res) => {
    const updatedUserData = await User.update(req.body, {where: {id: req.params.id}})
    res.json(updatedUserData)
})

router.delete('/:id', async (req,res) => {
    const deletedUser = await User.destroy({where: {id: req.params.id}})
    res.json(deletedUser)
})

module.exports = router;