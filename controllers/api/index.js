const router = require('express').Router();

const userRoutes = require('./userRoutes');
const favoriteRoutes = require('./favorite');
const friendsRoutes = require('./friends')

router.use('/users', userRoutes);
router.use('/favorite', favoriteRoutes);
router.use('/friends', friendsRoutes)

module.exports = router;