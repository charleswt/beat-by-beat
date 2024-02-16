const router = require('express').Router();
const userAuth = require('../utils/authentication')

router.get('/', userAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });
    res.render('homepage', userData);
  } catch (err) {
    res.status(500).json(err);
    res.render('game', {layout: 'error'});
  }
});

router.get('/signup', (req,res) => {
  try{
    res.render('signup')
  } catch(err){
    res.render('error', { layout: 'game' }).status(500).json({ message: 'Could not GET signup.handlebars'})
  }
})

router.get('/logout', async (req,res) => {
  try {
    return req.session.logged_in = false;
  } catch(err){
    res.render('error', { layout: 'game' }).status(500).json({ message: 'Could not GET /logout'})
  }
})

router.get('/login', async (req, res) => {
  try{
    if (req.session.logged_in) {
      res.render('/profile');
      return;
  }
    res.render('login')
  } catch(err){
    res.render('error', { layout: 'game' }).status(500).json({ message: 'Could not GET login.handlebars'})
  }
});

module.exports = router;
