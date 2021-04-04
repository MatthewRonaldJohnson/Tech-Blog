const router = require('express').Router();

router.get('/', async (req,res) => {
    res.end('🆗')
})

module.exports = router;