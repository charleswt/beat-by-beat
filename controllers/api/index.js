const router = require('express').Router();

const userRoutes = require('./userRoutes');
const favoriteRoutes = require('./favorite');

router.use('/users', userRoutes);
router.use('/favorite',favoriteRoutes);

module.exports = router;