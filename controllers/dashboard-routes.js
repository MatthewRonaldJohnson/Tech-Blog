const router = require('express').Router();

router.get('/', async (req,res) => {
    res.end('under construction')
})

router.post('/', async (req,res) => {
    res.end(JSON.stringify(req.body))
})

module.exports = router;