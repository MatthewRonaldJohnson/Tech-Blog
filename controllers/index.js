const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes')
const dashBoardRoutes = require('./dashboard-routes')

router.use('/', homeRoutes);
router.use('/dashboard', dashBoardRoutes);
router.use('/api', apiRoutes);

router.use((req, res) => {
    //404 page
    res.status(404).send("<h1>404: Page Not Found</h1>")
  });

module.exports = router;