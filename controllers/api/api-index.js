const router = require('express').router();
const userRoutes = require('./api-user');

router.use('/users', userRoutes);

modeule.exports = router;